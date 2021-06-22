import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '../entities/item.entity';
import { Repository } from 'typeorm';
import { ItemDTO } from './item.dto';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly repository: Repository<Item>
  ) { }

  public async getAll(): Promise<ItemDTO[]> {
    const items = await this.repository.find();
    return items.map(item => ItemDTO.from(item))
  }

  public async create(dto: ItemDTO): Promise<Item> {
    const item = await this.repository.save(dto.toEntity())
    return item
  }
}
