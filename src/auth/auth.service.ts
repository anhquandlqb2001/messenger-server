import { Injectable } from '@nestjs/common';
import { UserDTO } from '../user/user.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from "bcrypt"
import { UserLoginInput } from './auth.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  public async registerUser(userDTO: UserDTO) {
    return this.userService.createUser(userDTO)
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
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}