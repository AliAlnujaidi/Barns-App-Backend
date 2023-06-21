import { Injectable } from '@nestjs/common';
import { CreateBarnDto } from './dto/create-barn.dto';
import { UpdateBarnDto } from './dto/update-barn.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Barn } from './entities/barn.entity';
import { Repository } from 'typeorm';
import { PublicFilesService } from '../publicFiles/publicFiles.service';
import multer from 'multer';
import { PublicFile } from 'src/publicFiles/entities/publicFile.entity';

@Injectable()
export class BarnsService {
  constructor(
    @InjectRepository(Barn)
    private barnRepository: Repository<Barn>,
    @InjectRepository(PublicFile)
    private publicFilesRepository: Repository<PublicFile>,
    private readonly publicFileService: PublicFilesService
  ) { }

  async create(barn: CreateBarnDto) {
    const newBarn = await this.barnRepository.create(barn);
    await this.barnRepository.save(newBarn);
    return newBarn;
  }

  async addPhotos(barnId: number, file: Express.Multer.File) {
    const photoKey = await this.publicFileService.uploadPublicFile(`barn-${barnId}-bucket`, file)
    const newFile = await this.publicFilesRepository.create({
      key: photoKey,
      barn: barnId
    })
    await this.publicFilesRepository.save(newFile);
    return "photo added";
  }


  findAll() {
    return this.barnRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} barn`;
  }

  update(id: number, updateBarnDto: UpdateBarnDto) {
    return `This action updates a #${id} barn`;
  }

  remove(id: number) {
    return `This action removes a #${id} barn`;
  }
}
