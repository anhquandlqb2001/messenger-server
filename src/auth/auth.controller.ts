import { Body, Controller, Post } from '@nestjs/common';
import { UserDTO } from '../user/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('register')
  async register(@Body() user: UserDTO) {
    return this.authService.registerUser(user)
  }
}
