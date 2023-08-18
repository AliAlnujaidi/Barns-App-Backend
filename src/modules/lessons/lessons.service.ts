import { Injectable } from '@nestjs/common';
import { Lesson } from './entities/lesson.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private repository: Repository<Lesson>,
  ) {}

  async getLessons() {
    const result = await this.repository.create({
      barn: 1,
      length: 2,
      date: new Date(),
    });
    return await this.repository.save(result);
  }
}
