import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsObjectIdPipe } from 'src/pipes/is.object.id.pipe';
import { CreateItemDto } from './dto/create.update.item.dto/create.item.dto';
import { UpdateItemDto } from './dto/create.update.item.dto/update.item.dto';
import { FilterPaginationDto } from './dto/filter.pagination.dto/filter.pagination.dto';
import { ItemDocument } from './item.schema';
import { ItemsService } from './items.service';
@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post('create')
  async create(@Body() createItemDto: CreateItemDto): Promise<ItemDocument> {
    return await this.itemsService.create(createItemDto);
  }

  @Post('search')
  async findByOption(
    @Body() filterPaginationDto: FilterPaginationDto,
  ): Promise<ItemDocument[]> {
    return await this.itemsService.findByOption(filterPaginationDto);
  }

  @Put('update/:id')
  async updateItem(
    @Param('id', new IsObjectIdPipe()) id: string,
    @Body() updateItem: UpdateItemDto,
  ) {
    return await this.itemsService.updateInbound(id, updateItem);
  }

  // TODO: you cannot delete item if items exist in any order.
  @Delete(':id')
  async softDelete(
    @Param('id', new IsObjectIdPipe()) id: string,
  ): Promise<ItemDocument> {
    return await this.itemsService.softDelete(id);
  }
}
