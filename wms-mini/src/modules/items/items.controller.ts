import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsObjectIdPipe } from 'src/pipes/is.object.id.pipe';
import { CreateItemDto } from './dto/create.item.dto';
import { FindingOptionDto } from './dto/finding.option.item.dto';
import { ItemDocument } from './item.schema';
import { ItemsService } from './items.service';
@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post('create')
  async create(@Body() createItemDto: CreateItemDto): Promise<ItemDocument> {
    return this.itemsService.create(createItemDto);
  }

  @Post()
  async findByOption(
    @Body() findingOptionDto: FindingOptionDto,
  ): Promise<CreateItemDto[]> {
    return this.itemsService.findByOption(findingOptionDto);
  }

  @Delete(':id')
  async softDelete(
    @Param('id', new IsObjectIdPipe()) id: string,
  ): Promise<ItemDocument> {
    return this.itemsService.softDelete(id);
  }
}
