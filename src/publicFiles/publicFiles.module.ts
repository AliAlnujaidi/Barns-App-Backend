import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PublicFile } from './entities/publicFile.entity';
import { PublicFilesService } from './publicFiles.service';
import { PublicFilesController } from './publicFiles.controller';
import { MinioModule } from 'nestjs-minio-client';

@Module({
  imports: [TypeOrmModule.forFeature([PublicFile]),
    MinioModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        endPoint: configService.get('MINIO_ENDPOINT'),
        port: parseInt(configService.get('MINIO_PORT')),
        useSSL: false, // If on localhost, keep it at false. If deployed on https, change to true
        accessKey: configService.get('MINIO_ACCESS_KEY'),
        secretKey: configService.get('MINIO_SECRET_KEY'),
        region: 'eu-west-1'
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [PublicFilesService],
  controllers: [PublicFilesController]
})
export class PublicFilesModule {}