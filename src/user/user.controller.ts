import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async profile(@Request() req) {
    const user = await this.userService.findUser(req.user.email);
    const { password, ...result } = user;
    return {
      user: result,
      success: true,
    };
  }

  // @UseGuards(JwtAuthGuard)
  @Get('search')
  async findPeople(@Request() req) {
    const users = await this.userService.findOtherPeople(req.body.searchTerm);
    return {
      users: users,
      success: true,
    };
  }
}
