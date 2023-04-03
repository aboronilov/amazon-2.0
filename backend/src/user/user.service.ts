import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { returnUserObject } from './utils';
import { Prisma } from '@prisma/client';
import { UpdateUserDto } from './dto';
import { hash } from 'argon2';

@Injectable()
export class UserService {
   constructor(private prisma: PrismaService) { }

   async getUserById(id: string, selectObject: Prisma.UserSelect = {}) {
      const user = await this.prisma.user.findUnique({
         where: {
            id
         },
         select: {
            ...returnUserObject,
            favorites: {
               select: {
                  id: true,
                  name: true,
                  price: true,
                  images: true,
                  slug: true
               }
            },
            ...selectObject
         }
      })

      if (!user) {
         throw new NotFoundException("User not found")
      }

      return user
   }

   async updateProfile(id: string, dto: UpdateUserDto) {
      const isOwner = await this.prisma.user.findUnique({
         where: {
            email: dto.email
         }
      })
      console.log(isOwner)

      if (isOwner.id !== id) {
         throw new BadRequestException("You are not the owner of this profile")
      }

      const user = await this.getUserById(id);

      return await this.prisma.user.update({
         where: {
            id
         },
         data: {
            email: dto.email,
            name: dto.name,
            avatarPath: dto.avatarPath,
            phone: dto.phone,
            password: dto.password ? await hash(dto.password) : user.password
         }
      })
   }

   async toggleFavorite(id: string, productId: string) {
      const user = await this.getUserById(id)

      if (!user) {
         throw new NotFoundException("User not found")
      }

      const userHasProuduct = user.favorites.find(item => item.id === productId)

      await this.prisma.user.update({
         where: {
            id
         },
         data: {
            favorites: {
               [userHasProuduct ? "disconnect" : "connect"]: {
                  id: productId
               }
            }
         }
      })

      return { message: "Success" }
   }
}
