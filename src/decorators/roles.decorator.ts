// import { SetMetadata } from '@nestjs/common';
// import { Roles } from 'src/constants/roles.enum';

// export const HAS_ROLE = 'HAS_ROLE';
// export const RolesGuards = (roles: Roles[]) => SetMetadata(HAS_ROLE, roles);
import { UseGuards, applyDecorators } from '@nestjs/common';
import { Roles } from 'src/constants/roles.enum';
import RolesGuard from 'src/guards/role.guard';

export function RolesGuards(roles: Roles[]) {
  return applyDecorators(UseGuards(RolesGuard([...roles])));
}
