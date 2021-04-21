import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    let { user } = context.switchToHttp().getRequest();
    console.log('requiredRoles', requiredRoles);
    user.roles = user.roles.map(role => {
      return role.roleName
    })
    console.log('user.roles', user.roles);
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
