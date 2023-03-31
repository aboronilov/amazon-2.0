import { Injectable, BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { RefreshToken, RegisterUserDto } from './dto';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
   constructor(
      private prisma: PrismaService,
      private jwt: JwtService,
   ) { }

   async login(dto: RegisterUserDto) {
      const user = await this.validateUser(dto)
      const { accessToken, refreshToken } = await this.getTokenPair(user.id)

      return {
         user: this.returnUserFields(user),
         accessToken,
         refreshToken
      }
   }

   async getNewTokens(dto: RefreshToken) {
      const { refreshToken: tokenToCheck } = dto;
      const result = await this.jwt.verifyAsync(tokenToCheck)
      if (!result) {
         throw new UnauthorizedException("Invalid refresh token")
      }
      const user = await this.prisma.user.findFirstOrThrow({
         where: {
            id: result.id
         }
      })
      const { accessToken, refreshToken } = await this.getTokenPair(user.id)

      return {
         user: this.returnUserFields(user),
         accessToken,
         refreshToken
      }
   }


   async register(dto: RegisterUserDto) {
      const {
         email,
         name,
         password,
         avatarPath,
         phone
      } = dto;
      const userExists = await this.prisma.user.findUnique({
         where: {
            email
         }
      })

      if (userExists) {
         throw new BadRequestException('User already exists', { cause: new Error(), description: 'User already exists' })
      }

      const user = await this.prisma.user.create({
         data: {
            email,
            password: await hash(password),
            name,
            avatarPath,
            phone
         }
      })

      const { accessToken, refreshToken } = await this.getTokenPair(user.id);

      return {
         user: this.returnUserFields(user),
         accessToken,
         refreshToken
      }
   }

   private async getTokenPair(userId: string) {
      const data = { id: userId };
      const accessToken = this.jwt.sign(data, {
         expiresIn: "1h",
      });
      const refreshToken = this.jwt.sign(data, {
         expiresIn: "7d",
      });
      return { accessToken, refreshToken }
   }

   private returnUserFields(user: User) {
      return {
         id: user.id,
         email: user.email
      }
   }

   private async validateUser(dto: RegisterUserDto) {
      const user = await this.prisma.user.findUnique({
         where: {
            email: dto.email
         }
      })
      if (!user) {
         throw new NotFoundException("User not found",{ cause: new Error(), description: 'User not found' })
      }
      const isValid = await verify(user.password, dto.password)
      if (!isValid) {
         throw new UnauthorizedException("Invalid credentials",{ cause: new Error(), description: 'Invalid credentials' })
      }
      return user;
   }
}
