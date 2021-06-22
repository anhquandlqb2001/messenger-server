import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { Item } from 'src/entities/item.entity';
import { ItemDTO } from './item.dto';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private readonly service: ItemService) { }

  @Get()
  public async getAll(): Promise<ItemDTO[]> {
    return await this.service.getAll()
  }

  @Post()
  public async post(@Body() dto: ItemDTO): Promise<Item> {
    return this.service.create(dto);
  }
}
