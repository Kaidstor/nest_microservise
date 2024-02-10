import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { Strategy } from "passport-custom";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
   constructor(private authService: AuthService) {
      super()
   }

   async validate(req: any, done: Function) {
      try {
        const { email, password } = req;        
  
        const user = await this.authService.validateUser(email, password);

        if (!user)
          return done(new UnauthorizedException(), false);
        
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
}
