import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Item } from '../entities/item.entity';

export class ItemDTO implements Readonly<ItemDTO> {
  @ApiProperty({ required: true })
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsString()
  description: string;

  public static from(dto: Partial<ItemDTO>) {
    const it = new ItemDTO();
    it.name = dto.name;
    it.description = dto.description;
    return it;
  }

  public static fromEntity(entity: Item) {
    return this.from({
      name: entity.name,
      description: entity.description
    });
  }

  public toEntity() {
    const it = new Item();
    it.name = this.name;
    it.description = this.description;
    return it;
  }
}