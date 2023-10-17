import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PublicFilesService } from './publicFiles.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { number } from '@hapi/joi';
@Controller('publicfiles')
export class PublicFilesController {
  constructor(private readonly publicFilesService: PublicFilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body('bucketName') bucketName: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // return this.publicFilesService.uploadPublicFile(1,bucketName, file);
  }

  @Get()
  getFile() {
    return this.publicFilesService.getFile();
  }
  @Get('test/:id')
  test(@Param('id') id: string) {
    return this.publicFilesService.deleteFile(+id);
  }
}
