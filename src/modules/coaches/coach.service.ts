import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coach } from './entities/coach.entity';
import { Repository } from 'typeorm';
import { PublicFilesService } from 'src/modules/publicFiles/publicFiles.service';
import { Avatar } from './entities/coachAvatar.entity';

@Injectable()
export class CoachesService {
  constructor(
    @InjectRepository(Coach)
    private coachesRepository: Repository<Coach>,
    @InjectRepository(Avatar)
    private avatarRepository: Repository<Avatar>,
    private readonly publicFileService: PublicFilesService,
  ) {}

  async addAvatar(coachId: number, file: Express.Multer.File) {
    /*  1. check if coach exists
     *  2. check if he has avatar
     *    2.1. if yes then delete the old avatar and assign the new one
     *    2.2. if no then assign the avatar directly
     */
    const coach = await this.coachesRepository.findOneBy({ id: coachId });
    if (!coach) return 'coach not found';

    if (coach.avatar) {
      await this.publicFileService.deleteFile(coach.avatar.id);
      this.deleteAvatar(coachId);
    }
    const fileId = await this.publicFileService.uploadPublicFile(
      `users-avatars-bucket`,
      file,
    );

    const avatar = await this.avatarRepository.create({
      file: fileId,
    });
    await this.avatarRepository.save(avatar);
    await this.coachesRepository.update(coachId, {
      avatar: avatar,
    });

    return avatar;
  }

  async deleteAvatar(id: number) {
    const coach = this.coachesRepository.findOneBy({ id });
    await this.publicFileService.deleteFile((await coach).avatar.id);
    await this.avatarRepository.delete((await coach).avatar);
  }

  async findCoach(id: number) {
    const coach = await this.coachesRepository.findOneBy({ id });
    if (!coach) return 'coach not found';

    return coach;
  }
}
