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
    @InjectRepository(PublicFile)
    private publicFilesRepository: Repository<PublicFile>,
    private readonly configService: ConfigService,
  ) {
    this.config = {
      endpoint: this.configService.get('MINIO_ENDPOINT'),
      region: 'eu-west-1',
      s3ForcePathStyle: true,
      credentials: {
        accessKeyId: this.configService.get('MINIO_ACCESS_KEY'),
        secretAccessKey: this.configService.get('MINIO_SECRET_KEY'),
      },
    };
  }
  async getFile() {
    const s3 = new S3(this.config);
    const response = await s3.getSignedUrl('getObject', {
      Bucket: 'public-bucket',
      Key: 'b5b42028-7544-4089-8b4d-8d3264b1e8c2-undefined',
    });

    return response;
  }

  async uploadPublicFile(bucketName: string, file: Express.Multer.File) {
    //validate the file
    if (!file || !this.validateFile(file)) {
      return 'invalid file';
    }
    const s3 = new S3(this.config);
    const key = `${uuid()}-${file.filename}`;
    //if no bucket name give assign to public-bucket, else check if bucket exists.
    if (!bucketName) {
      bucketName = 'public-bucket';
    } else {
      //if bucket name not found, then create a bucket with the given name.
      if (!(await this.checkBucket(bucketName))) {
        await this.createBucket(bucketName);
      }
    }
    try {
      await s3
        .putObject({
          Bucket: `${bucketName}`,
          Body: file.buffer,
          Key: `${key}`,
        })
        .promise();
    } catch (error) {
      return error;
    }
    console.log('*************');
    const newFile = await this.publicFilesRepository.create({
      key: key,
      url: 'unique url....',
      bucket: bucketName,
    });
    await this.publicFilesRepository.save(newFile);

    return newFile.id;
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
    return console.log('bucket craeted');
  }

  validateFile(file: Express.Multer.File) {
    const fileType = file.buffer.subarray(0, 4);
    const jpg = Buffer.from([255, 216, 255, 224]);
    const pdf = Buffer.from([0x25, 0x50, 0x44, 0x46]);
    if (fileType.equals(jpg) || fileType.equals(pdf)) return true;
    return false;
  }

  async deleteFile(fileId: number) {
    const file = await this.publicFilesRepository.findOneBy({ id: fileId });
    if (!file) return 'file not found';

    const s3 = new S3(this.config);
    const result = await s3
      .deleteObject({
        Bucket: file.bucket,
        Key: file.key,
      })
      .promise();
    await this.publicFilesRepository.delete(file);

    return result;
  }
}
