import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// import { UserDto } from './../../user/dto/user.dto';
import { User } from '@prisma/client';

export const CurrentUser = createParamDecorator(
   (
      data: string | null,
      ctx: ExecutionContext
   ) => {
      const request: Express.Request = ctx.switchToHttp().getRequest();
      if (data) {
         return request.user[data]
      }
      return request.user;
   },
);