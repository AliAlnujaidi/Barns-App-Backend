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
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    public repository: Repository<User>,
  ) {}

  async createUser(userData: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
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
  async loginUser(userData: LoginUserDto) {
    const user = await this.repository.findOne({
      where: { email: userData.email },
    });
    if (!user) {
      throw new NotFoundException('User with this email does not exist');
    }
    const isMatch = await bcrypt.compare(userData.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Wrong credentials provided');
    }
    return user;
  }
}
