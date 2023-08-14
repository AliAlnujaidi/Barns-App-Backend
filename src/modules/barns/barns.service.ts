import { Injectable } from '@nestjs/common';
import { CreateBarnDto } from './dto/create-barn.dto';
import { UpdateBarnDto } from './dto/update-barn.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Barn } from './entities/barn.entity';
import { RelationId, Repository } from 'typeorm';
import { PublicFilesService } from '../publicFiles/publicFiles.service';
import { PublicFile } from 'src/publicFiles/entities/publicFile.entity';
import { BarnPhoto } from './entities/barnPhoto.entity';

@Injectable()
export class BarnsService {
  constructor(
    @InjectRepository(Barn)
    private barnRepository: Repository<Barn>,
    @InjectRepository(BarnPhoto)
    private barnPhotoRepository: Repository<BarnPhoto>,

    private readonly publicFileService: PublicFilesService,
  ) {}

  async create(barn: CreateBarnDto) {
    const newBarn = await this.barnRepository.create(barn);
    await this.barnRepository.save(newBarn);
    return newBarn;
  }

  async addPhotos(barnId: number, file: Express.Multer.File) {
    if (await this.barnNotExist(barnId)) return 'barn does not exists';

    const fileId = await this.publicFileService.uploadPublicFile(
      `barn-${barnId}-bucket`,
      file,
    );
    const photo = await this.barnPhotoRepository.create({
      file: fileId,
      barn: barnId,
    });
    await this.barnPhotoRepository.save(photo);
    return photo;
  }

  async deletePhotos(barnId: number, photoId: number) {
    if (await this.barnNotExist(barnId)) return 'barn does not exists';

    const photo = await this.barnPhotoRepository.findOneBy({ id: photoId });
    if (!photo) return 'photo not found';

    await this.barnPhotoRepository.delete(photo);

    await this.publicFileService.deleteFile(photo.file.id);

    return ' photo deleted';
  }

  findAll() {
    return this.barnRepository.find();
  }

  async findOne(id: number) {
    const barn = await this.barnRepository.findOneBy({ id });
    if (!barn) return 'barn does not exists';

    return barn;
  }

  async update(id: number, updateBarnDto: UpdateBarnDto) {
    return await this.barnRepository.update(id, updateBarnDto);
  }

  async remove(id: number) {
    const barn = await this.barnRepository.findOneBy({ id: id });
    if (!barn) return 'barn dows not exists';

    try {
      await this.barnRepository.delete(id);
      return `${barn.name} successfully deleted`;
    } catch {
      return 'cannot delete barn that has appointments';
    }
  }

  async barnNotExist(id: number) {
    const barn = await this.barnRepository.findOneBy({ id });
    if (barn) return false;

    return true;
  }
}
