import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from './user.dto';
import * as bcrypt from 'bcrypt';
import { SALT_ROUND } from '../constants';
import { PublicUserDTO } from './public-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async createUser(userDto: UserDTO) {
    try {
      // hash password
      userDto.password = await bcrypt.hash(userDto.password, SALT_ROUND);

      const user = await this.userRepository.save(userDto.toEntity());

      return PublicUserDTO.createFromEntity(user);
    } catch (error) {
      console.log(error);
      return { error };
    }
  }

  // need password
  public async findUser(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  public async findPublicUser(userId: string): Promise<PublicUserDTO> {
    const user = await this.userRepository.findOne({ id: userId });
    return PublicUserDTO.createFromEntity(user);
  }

  public async findOtherPeople(searchTerm: string) {
    const users = await this.userRepository
      .createQueryBuilder('users')
      .select()
      .where('users.firstName ILIKE (:searchTerm)', {
        searchTerm: `%${searchTerm}%`,
      })
      .orWhere('users.lastName ILIKE (:searchTerm)', {
        searchTerm: `%${searchTerm}%`,
      })
      .getMany();

    const result = users.map((user) => PublicUserDTO.createFromEntity(user));
    return result;
  }
}
