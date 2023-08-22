import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { UsersModule } from './modules/users/users.module';
import { BarnsModule } from './modules/barns/barns.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { MinioClientModule } from './modules/minio/minio-client.module';
import { PublicFilesModule } from './modules/publicFiles/publicFiles.module';
import { CoachModule } from './modules/coaches/coach.module';
import { JWTMiddleware } from './middlewares/JwtMiddleware';
import { LessonsModule } from './modules/lessons/lessons.module';
import { LessonsService } from './modules/lessons/lessons.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { configService } from './config/config.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/role.guard';
import { contextMiddleware } from './middlewares/context.middleware';
// import { RolesGuard } from './guards/role.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UsersModule,
    CoachModule,
    BarnsModule,
    AuthenticationModule,
    AppointmentsModule,
    PublicFilesModule,
    LessonsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(contextMiddleware).forRoutes('*');
    consumer.apply(JWTMiddleware).forRoutes('*');
  }
}
