import { allow } from '@hapi/joi';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from 'src/constants/roles.enum';
import { HAS_ROLE } from 'src/decorators/roles.decorator';
import { User } from 'src/modules/users/entities/user.entity';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  @Inject(UsersService)
  private usersService: UsersService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const allowedRoles = this.reflector.get<Roles[]>(
      HAS_ROLE,
      context.getHandler(),
    );
    if (!allowedRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const userId = request.user;

    if (!userId) {
      throw new UnauthorizedException(
        "you don't have permission to access this route",
      );
    }
    const user = await this.usersService.repository.findOneBy({ id: userId });
    const role = user.role;

    if (!role) {
      throw new UnauthorizedException(
        "you don't have permission to access this route",
      );
    }
    console.log(allowedRoles.includes(role));
    if (allowedRoles.includes(role)) {
      return true;
    } else {
      throw new UnauthorizedException(
        "you don't have permission to access this route",
      );
    }
  }
}
