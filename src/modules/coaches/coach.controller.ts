// import { FileInterceptor } from '@nestjs/platform-express';
// import { CoachesService } from './coach.service';
// import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';

// @Controller('coaches')
// export class CoachesController {
//   constructor(private readonly coachesService: CoachesService) { }

//   @Get(':id')
//   getCoach(@Param('id') coachId: number) {
//     return this.coachesService.findCoach(coachId);
//   }

//   //requiere admin
//   @Post('avatar')
//   @UseInterceptors(FileInterceptor('file'))
//   addPhoto(@Body('userId') userId: number, @UploadedFile() file: Express.Multer.File) {
//     return this.coachesService.addAvatar(userId, file);
//   }
// }
