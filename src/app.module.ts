import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EvaluationsModule } from './evaluations/evaluations.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [EvaluationsModule, ServicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
