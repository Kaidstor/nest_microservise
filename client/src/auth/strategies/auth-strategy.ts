import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { Strategy } from "passport-custom";

@Injectable()
export class AuthorizationStrategy extends PassportStrategy(Strategy, 'auth') {
   constructor(private authService: AuthService) {
      super()
   }

   async validate(req: any, done: Function) {
      try {
         const auth = await this.authService.checkAuth(req.headers);
         return auth;
      } catch (error) {
         done(error, false);
      }
   }
}

export interface AuthReqData { user: { id: number, role: string } }