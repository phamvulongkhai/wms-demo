import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateItemDto } from './dto/create.item.dto';
import { ItemsService } from './items.service';
@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post('create')
  async create(@Body() createItemDto: CreateItemDto): Promise<CreateItemDto> {
    return this.itemsService.create(createItemDto);
  }

  @Get('all')
  async find(): Promise<CreateItemDto[]> {
    return this.itemsService.find();
  }
}
