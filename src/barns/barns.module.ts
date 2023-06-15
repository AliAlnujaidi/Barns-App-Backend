import { Module } from '@nestjs/common';
import { BarnsService } from './barns.service';
import { BarnsController } from './barns.controller';

@Module({
  controllers: [BarnsController],
  providers: [BarnsService]
})
export class BarnsModule {}
