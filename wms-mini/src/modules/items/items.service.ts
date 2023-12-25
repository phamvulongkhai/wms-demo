import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create.update.item.dto/create.item.dto';
import { UpdateItemDto } from './dto/create.update.item.dto/update.item.dto';
import { FilterPaginationItemDto } from './dto/filter.pagination.item.dto/filter.pagination.item.dto';
import { ItemDocument } from './item.schema';
import { ItemsRepository } from './items.repository';

@Injectable()
export class ItemsService {
  constructor(private readonly itemsRepository: ItemsRepository) {}

  async create(createItemDto: CreateItemDto): Promise<ItemDocument> {
    return await this.itemsRepository.create(createItemDto);
  }

  async findByOption(
    filterPaginationItemDto: FilterPaginationItemDto,
  ): Promise<ItemDocument[]> {
    return await this.itemsRepository.findByOption(filterPaginationItemDto);
  }

  // TODO: controller here
  // async getInventory(id: string): Promise<InventoryDto> {
  // return await this.itemsRepository.getInventory(id);
  // }

  async updateItem(
    id: string,
    updateItemDto: UpdateItemDto,
  ): Promise<ItemDocument> {
    return await this.itemsRepository.updateItem(id, updateItemDto);
  }

  async softDelete(id: string): Promise<ItemDocument> {
    return await this.itemsRepository.softDelete(id);
  }
}
