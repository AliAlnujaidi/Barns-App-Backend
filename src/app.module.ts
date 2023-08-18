import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/users/users.module';
import { BarnsModule } from './modules/barns/barns.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { MinioClientModule } from './modules/minio/minio-client.module';
import { PublicFilesModule } from './modules/publicFiles/publicFiles.module';
import { CoachModule } from './modules/coaches/coach.module';
import { JWTMiddleware } from './middlewares/JwtMiddleware';
import { LessonsModule } from './modules/lessons/lessons.module';
import { LessonsService } from './modules/lessons/lessons.service';

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
      isGlobal: true,
    }),
    UsersModule,
    CoachModule,
    BarnsModule,
    AuthenticationModule,
    AppointmentsModule,
    DatabaseModule,
    PublicFilesModule,
    LessonsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JWTMiddleware).forRoutes('*');
  }
}
