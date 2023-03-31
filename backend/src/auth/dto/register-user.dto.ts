import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional } from "class-validator";

export class RegisterUserDto {
   @IsEmail()
   @IsNotEmpty()
   email: string;

   @MinLength(6, {
      message: "Password should be longer than 6 characters"
   })
   @IsString()
   password: string;

   @IsString()
   @IsOptional()
   name: string;

   @IsString()
   @IsOptional()
   avatarPath: string;

   @IsString()
   @IsOptional()
   phone: string;
}