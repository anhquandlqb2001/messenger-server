import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Not, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SALT_ROUND } from '../constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async createUser(user: User) {
    try {
      // hash password
      user.password = await bcrypt.hash(user.password, SALT_ROUND);

      return await this.userRepository.save(user);
    } catch (error) {
      console.log(error);
      return { error };
    }
  }

  public async findUser(
    email?: string,
    userId?: string,
  ): Promise<User | undefined> {
    return this.userRepository.findOne({ where: [{ email }, { id: userId }] });
  }

  public async users(meId: string): Promise<User[] | undefined> {
    return this.userRepository.find({ where: { id: Not(meId) } });
  }

  public async findOtherPeoples(searchTerm: string) {
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

    return users;
  }
}
