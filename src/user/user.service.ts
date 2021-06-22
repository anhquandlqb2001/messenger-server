import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from './user.dto';
import * as bcrypt from 'bcrypt'
import { SALT_ROUND } from '../constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async createUser(userDto: UserDTO) {
    try {
      // hash password
      userDto.password = await bcrypt.hash(userDto.password, SALT_ROUND);
      
      const user = await this.userRepository.save(userDto.toEntity())
      
      const { email, firstName, lastName } = user
      return { email, firstName, lastName }
    } catch (error) {
      console.log(error);
      return { error }
    }
  }
}
