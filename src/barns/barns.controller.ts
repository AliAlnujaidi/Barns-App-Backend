import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { BarnsService } from './barns.service';
import { CreateBarnDto } from './dto/create-barn.dto';
import { UpdateBarnDto } from './dto/update-barn.dto';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('barns')
export class BarnsController {
  constructor(private readonly barnsService: BarnsService) {}

  @Get()
  findAll() {
    return this.barnsService.findAll();
  }

  @Post('add')
  create(@Body() createBarnDto: CreateBarnDto) {
    return this.barnsService.create(createBarnDto);
  }

  @Post('photo')
  @UseInterceptors(FileInterceptor('file'))
  addPhoto(@Body('barn') barn: number, @UploadedFile() file: Express.Multer.File) {
    return this.barnsService.addPhotos(barn,file);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.barnsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBarnDto: UpdateBarnDto) {
    return this.barnsService.update(+id, updateBarnDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.barnsService.remove(+id);
  }
}
