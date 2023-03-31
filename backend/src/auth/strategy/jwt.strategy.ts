import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma.service';
import { User } from "@prisma/client"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
   constructor(
      config: ConfigService,
      private prisma: PrismaService
   ) {
      super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         secretOrKey: config.get("JWT_SECRET"),
         ignoreExpiration: true,
      })
   }
   async validate({ id }: Pick<User, "id">) {
      return this.prisma.user.findUnique({
         where: {
            id
         }
      })
   }
}