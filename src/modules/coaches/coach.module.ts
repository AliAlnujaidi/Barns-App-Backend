import { Module } from '@nestjs/common';
import { CoachesService } from './coach.service';
import { CoachesController } from './coach.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coach } from './entities/coach.entity';
import { Avatar } from './entities/coachAvatar.entity';
import { PublicFilesModule } from 'src/modules/publicFiles/publicFiles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Coach]),
    TypeOrmModule.forFeature([Avatar]),
    PublicFilesModule,
  ],
  controllers: [CoachesController],
  providers: [CoachesService],
  exports: [],
})
export class CoachModule {}
