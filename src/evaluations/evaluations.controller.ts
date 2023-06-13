import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { EvaluationsService } from './evaluations.service';

@Controller('evaluations')
export class EvaluationsController {
  constructor(private readonly evaluationsService: EvaluationsService) {}

  @Get()
  getEvaluations() {
    return ['hello'];
  }

  @Get(':id')
  getParams(@Param('id') id: string) {
    return this.evaluationsService.getEvaluations(id);
  }

  @Post()
  getBody(@Body() createEvaluationDto: CreateEvaluationDto) {
    return {
      review: createEvaluationDto.review,
    };
  }
}
