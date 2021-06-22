import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Item } from '../entities/item.entity';
import { ItemDTO } from './item.dto';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private readonly service: ItemService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  public async getAll(): Promise<ItemDTO[]> {
    return await this.service.getAll()
  }

  @Post()
  public async post(@Body() dto: ItemDTO): Promise<Item> {
    return this.service.create(dto);
  }
}
