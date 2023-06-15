import { Injectable } from '@nestjs/common';
import { CreateBarnDto } from './dto/create-barn.dto';
import { UpdateBarnDto } from './dto/update-barn.dto';

@Injectable()
export class BarnsService {
  create(createBarnDto: CreateBarnDto) {
    return 'This action adds a new barn';
  }

  findAll() {
    return `This action returns all barns`;
  }

  findOne(id: number) {
    return `This action returns a #${id} barn`;
  }

  update(id: number, updateBarnDto: UpdateBarnDto) {
    return `This action updates a #${id} barn`;
  }

  remove(id: number) {
    return `This action removes a #${id} barn`;
  }
}
