import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDTO implements Readonly<CreateUserDTO> {
  @ApiProperty({ required: true })
  @IsString()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  password: string;

  @ApiProperty({ required: true })
  @IsString()
  firstName: string;

  @ApiProperty({ required: true })
  @IsString()
  lastName: string;

  public static create(dto: Partial<CreateUserDTO>) {
    const it = new CreateUserDTO();
    it.email = dto.email;
    it.password = dto.password;
    it.firstName = dto.firstName;
    it.lastName = dto.lastName;
    return it;
  }

  public static createFromEntity(entity: User) {
    return this.create({
      email: entity.email,
      password: entity.password,
      firstName: entity.firstName,
      lastName: entity.lastName,
    });
  }

  public toEntity() {
    const it = new User();
    it.email = this.email;
    it.password = this.password;
    it.firstName = this.firstName;
    it.lastName = this.lastName;
    return it;
  }
}
