import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { UserService } from '../user/user.service';
import { JwtPayload, UserLoginInput } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async registerUser(user: User) {
    return await this.userService.createUser(user);
  }

  public async validateUser(
    userInput: UserLoginInput,
  ): Promise<{ id: string; email: string } | UnauthorizedException> {
    const user = await this.userService.findUser(userInput.email);

    // check if user not existed
    if (!user) {
      return new UnauthorizedException({
        errors: [{ field: 'email', message: 'Email not found' }],
      });
    }

    // compare password
    const validated = await bcrypt.compare(userInput.password, user.password);

    // check if passworn is wrong
    if (!validated) {
      return new UnauthorizedException({
        errors: [{ field: 'password', message: 'Wrong password' }],
      });
    }
    const { id, email } = user;
    return { id, email };
  }

  async login(user: { id: string; email: string }) {
    const payload: JwtPayload = { email: user.email, userId: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
