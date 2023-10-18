import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    public repository: Repository<User>,
  ) {}

  async createUser(userData: CreateUserDto) {
    const newUser = await this.repository.create(userData);
    await this.repository.save(newUser);
    return newUser;
  }

  async getUserById(id: number) {
    const user = await this.repository.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException('User with this email does not exist');
    }
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.repository.findOneBy({ email: email });
    if (!user) {
      throw new NotFoundException('User with this email does not exist');
    }
    return user;
  }
}
