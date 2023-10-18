import {
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
  Type,
  mixin,
} from '@nestjs/common';
import { Roles } from 'src/constants/roles.enum';
import JwtAuthGuard from 'src/guards/jwt-auth.guard';
import { UsersService } from 'src/modules/users/users.service';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   @Inject(UsersService)
//   private usersService: UsersService;

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     console.log('role guard triggered');
//     const allowedRoles = this.reflector.get<Roles[]>(
//       HAS_ROLE,
//       context.getHandler(),
//     );
//     if (!allowedRoles) {
//       return true;
//     }

//     const request = context.switchToHttp().getRequest();
//     const userId = request.user;

//     if (!userId) {
//       throw new UnauthorizedException(
//         "you don't have permission to access this route",
//       );
//     }
//     const user = await this.usersService.repository.findOneBy({ id: userId });
//     const role = user.role;

//     if (!role) {
//       throw new UnauthorizedException(
//         "you don't have permission to access this route",
//       );
//     }
//     if (allowedRoles.includes(role)) {
//       return true;
//     } else {
//       throw new UnauthorizedException(
//         "you don't have permission to access this route",
//       );
//     }
//   }
// }

const RolesGuard = (roles: Roles[]): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthGuard {
    @Inject(UsersService)
    private usersService: UsersService;

    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const allowedRoles = roles;
      if (!allowedRoles) {
        return true;
      }

      const request = context.switchToHttp().getRequest();
      const userId = request.user.id;

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
      if (allowedRoles.includes(role)) {
        return true;
      } else {
        throw new UnauthorizedException(
          "you don't have permission to access this route",
        );
      }
    }
  }
  return mixin(RoleGuardMixin);
};

export default RolesGuard;
