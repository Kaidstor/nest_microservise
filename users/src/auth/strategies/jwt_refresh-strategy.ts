import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";


const jwtFromMessage = (req): string | null => req?.refresh;

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
   constructor() {
      super({
         jwtFromRequest: jwtFromMessage,
         ignoreExpiration: false,
         secretOrKey: `${process.env.jwt_secret}`,
      })
   }

   validate(payload: any) {
      return { id: payload.id, role: payload.role };
   }
}