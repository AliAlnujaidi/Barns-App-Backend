import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {PublicFile} from './entities/publicFile.entity';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import { MinioService } from 'nestjs-minio-client';
import { S3Client, PutObjectCommand  } from "@aws-sdk/client-s3";

@Injectable()
export class PublicFilesService {

  constructor(
    private readonly minio: MinioService,
    private readonly configService: ConfigService) {
  }

  async uploadPublicFile(file: Express.Multer.File) {
    const s3 = new S3Client(this.minio.client);
    const input = {
      Bucket: 'public-backet',
      Body: file.buffer,
      Key: `${uuid()}-${file.filename}`
    };
    const command = new PutObjectCommand(input);
    const uploadResult = await s3.send(command);
    
    // const s3 = new S3(this.minio.client);
    // const input = {
    //   Bucket: "public-bucket",
    //   Key: "1234",
    //   UploadId: "STRING_222VALUE",
    // }
    // const command = new AbortMultipartUploadCommand(input);
    // const uploadResult = await s3.send(command);
 
    // const newFile = this.publicFilesRepository.create({
    //   key: uploadResult.versionId
    //   url: uploadResult.
    // });
    // await this.publicFilesRepository.save(newFile);
    return uploadResult;
  }
}