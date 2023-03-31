import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto, RefreshToken } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @HttpCode(HttpStatus.OK)
  async register(@Body() dto: RegisterUserDto) {
   return this.authService.register(dto);
  }

  @Post("login")
  async login(@Body() dto: RegisterUserDto) {
   return this.authService.login(dto);
  }

  @Post("login/access-token")
  async getNewTokens(@Body() dto: RefreshToken) {
   return this.authService.getNewTokens(dto);
  }
}
