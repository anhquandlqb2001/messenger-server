import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from "bcrypt"
import { JwtPayload, UserLoginInput } from './auth.interface';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  public async registerUser(user: User) {
    return await this.userService.createUser(user)
  }

  public async validateUser(userInput: UserLoginInput) {
    const user = await this.userService.findUser(userInput.email);
    
    // check if user not existed
    if (!user) return null

    // compare password
    const validated = await bcrypt.compare(userInput.password, user.password)

    // check if passworn is wrong
    if (!validated) {
      return null
    }
    const { id, email } = user;
    return { id, email };
  }

  async login(user: { id: string, email: string }) {
    const payload: JwtPayload = { email: user.email, userId: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}