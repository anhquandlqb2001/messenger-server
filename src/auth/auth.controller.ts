import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { UserDTO } from '../user/user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('register')
  public async register(@Body() user: UserDTO) {
    return this.authService.registerUser(user)
  }
  
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Request() req) {
    return this.authService.login(req.user)
  }
}
