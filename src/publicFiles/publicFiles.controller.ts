import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PublicFilesService } from './publicFiles.service';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('publicfiles')
export class PublicFilesController {
  constructor(private readonly publicFilesService: PublicFilesService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@Body('bucketName') bucketName: string, @UploadedFile() file: Express.Multer.File) {
    return this.publicFilesService.uploadPublicFile(bucketName, file);
  }

  @Get()
  getFile(){
    return this.publicFilesService.getFile();
  }
}
