import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateUserDTO } from '../user/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  public async register(@Body() user: CreateUserDTO) {
    const result = await this.authService.registerUser(user.toEntity());
    return result;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
