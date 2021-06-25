import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class PublicUserDTO implements Readonly<PublicUserDTO> {
  @IsString()
  id: string;

  @IsString()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  firstName: string;

  @ApiProperty({ required: true })
  @IsString()
  lastName: string;

  public static create(dto: Partial<PublicUserDTO>) {
    const it = new PublicUserDTO();
    it.id = dto.id;
    it.email = dto.email;
    it.firstName = dto.firstName;
    it.lastName = dto.lastName;
    return it;
  }

  public static createFromEntity(entity: User) {
    return this.create({
      id: entity.id,
      email: entity.email,
      firstName: entity.firstName,
      lastName: entity.lastName,
    });
  }

  public toEntity() {
    const it = new User();
    it.email = this.email;
    it.firstName = this.firstName;
    it.lastName = this.lastName;
    return it;
  }
}
