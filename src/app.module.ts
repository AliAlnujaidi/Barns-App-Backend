import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentsModule } from './appointments/appointments.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { BarnsModule } from './barns/barns.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { MinioClientModule } from './minio/minio-client.module';
import { PublicFilesModule } from './publicFiles/publicFiles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),

        PORT: Joi.number(),

        MINIO_ENDPOINT: Joi.string().required(),
        MINIO_PORT: Joi.number().required(),
        MINIO_ACCESS_KEY: Joi.string().required(),
        MINIO_SECRET_KEY: Joi.string().required(),

        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      }),
      isGlobal: true
    }), UsersModule, BarnsModule, AuthenticationModule, AppointmentsModule, DatabaseModule, PublicFilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
