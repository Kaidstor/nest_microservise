import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalAuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {    
    const req = context.switchToHttp().getRequest();

    const user = await this.authService.validateUser(req.email, req.password);

    if (!user)
       return false

    return true
  }
}