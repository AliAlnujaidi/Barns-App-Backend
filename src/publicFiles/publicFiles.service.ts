import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PublicFile } from './entities/publicFile.entity';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import { S3 } from 'aws-sdk';

@Injectable()
export class PublicFilesService {
  private config: S3.ClientConfiguration;
  constructor(
    private readonly configService: ConfigService) {
    this.config = {
      endpoint: this.configService.get('MINIO_ENDPOINT'),
      region: 'eu-west-1',
      s3ForcePathStyle: true,
      credentials: {
        accessKeyId: this.configService.get('MINIO_ACCESS_KEY'),
        secretAccessKey: this.configService.get('MINIO_SECRET_KEY'),
      },
    }
  }
  async getFile(){
    const s3 = new S3(this.config);
    return await s3.getObject({Bucket: 'public-bucket' , Key:'d8cc37324ea7d52613b8033f1500b302'}).promise();
  }

  async uploadPublicFile(bucketName: string, file: Express.Multer.File) {
    //validate the file
    if (!file || !this.validateFile(file)) {
      return 'invalid file'
    }
    const s3 = new S3(this.config);
    const key = uuid();
    //if no bucket name give assign to public-bucket, else check if bucket exists.
    if (!bucketName) {
      bucketName = 'public-bucket';
    } else {
      //if bucket name not found, then create a bucket with the given name.
      if (!await this.checkBucket(bucketName)) {
        await this.createBucket(bucketName);
      }
    }
    console.log(key)
    return await s3.putObject({
      Bucket: `${bucketName}`,
      Body: file.buffer,
      Key: `${key}`
    }).promise();
  }


  async checkBucket(bucketName: string) {
    const s3 = new S3(this.config);
    try {
      await s3.headBucket({ Bucket: bucketName }).promise();
      return true;
    } catch (error) {
      return false;
    }
  }

  async createBucket(bucketName: string) {
    const s3 = new S3(this.config);
    await s3.createBucket({ Bucket: `${bucketName}` }).promise();
    return console.log('bucket craeted')
  }

  validateFile(file: Express.Multer.File) {
    if (file.mimetype.includes('jpeg') || file.mimetype.includes('pdf'))
      return true
    return false
  }
}