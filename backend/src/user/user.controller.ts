import { Body, Controller, Get, HttpCode, HttpStatus, Patch, Put, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth, CurrentUser } from '../auth/decorators';
import { UpdateUserDto } from './dto';

@Controller('users')
export class UserController {
   constructor(private readonly userService: UserService) { }

   @Get("profile")
   @Auth()
   async getProfile(@CurrentUser("id") id: string) {
      return this.userService.getUserById(id);
   }

   @Put("profile")
   @Auth()
   @HttpCode(HttpStatus.OK)
   async updateProfile(
      @CurrentUser("id") id: string,
      @Body() dto: UpdateUserDto,
   ) {
      return this.userService.updateProfile(id, dto);
   }

   @Patch("profile/favorites/:productId")
   @HttpCode(HttpStatus.OK)
   @Auth()
   async toggleFavorite(
      @CurrentUser("id") id: string,
      @Param("productId") productId: string,
   ) {
      return this.userService.toggleFavorite(id, productId);
   }
}
