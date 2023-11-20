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
import { use } from 'passport';

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

  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.repository.update(userId, {
      currentHashedRefreshToken,
    });
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    const user = await this.getUserById(userId);
    if (!user.currentHashedRefreshToken) {
      return;
    }

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );
    if (isRefreshTokenMatching) {
      return user;
    }
  }

  async removeRefreshToken(userId: number) {
    return this.repository.update(userId, {
      currentHashedRefreshToken: null,
    });
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

  async getAllUsers() {
    return await this.repository.find();
  }
}
