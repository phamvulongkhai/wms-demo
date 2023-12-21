import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateItemDto } from './dto/create.item.dto';
@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor() {}

  @Post('create')
  async create(@Body() createItemDto: CreateItemDto): Promise<CreateItemDto> {
    return createItemDto;
  }
}
