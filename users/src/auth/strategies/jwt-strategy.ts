import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";

const jwtFromMessage = (req): string | null => req?.accessToken

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
   constructor() {
      super({
         jwtFromRequest: jwtFromMessage,
         ignoreExpiration: false,
         secretOrKey: `${process.env.jwt_secret}`,
      })
   }

   async validate(payload: any) {
      return { id: payload.id, role: payload.role };
   }
}