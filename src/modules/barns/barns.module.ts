import { Module } from '@nestjs/common';
import { BarnsService } from './barns.service';
import { BarnsController } from './barns.controller';
import { Barn } from './entities/barn.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicFilesModule } from 'src/publicFiles/publicFiles.module';
import { PublicFile } from 'src/publicFiles/entities/publicFile.entity';
import { BarnPhoto } from './entities/barnPhoto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Barn]),TypeOrmModule.forFeature([BarnPhoto]), PublicFilesModule],
  controllers: [BarnsController],
  providers: [BarnsService]
})
export class BarnsModule {}
