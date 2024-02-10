import { Injectable, CanActivate, ExecutionContext, ForbiddenException, SetMetadata} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    
    if (!requiredRoles) 
      return true;
    
    const { user } = context.switchToHttp().getRequest();


    const hasRole = requiredRoles.some((role) => user.role.includes(role));

    if (!hasRole) {
      throw new ForbiddenException('Доступ запрещен: недостаточно прав');
    }
    
    return true;
  }
}

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
