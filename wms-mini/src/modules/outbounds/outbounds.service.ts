import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOutboundDto } from './dto/create.update.outbound.dto/create.outbound.dto';
import { Outbound, OutboundDocument } from './schemas/outbound.schema';

@Injectable()
export class OutboundsService {
  constructor(
    @InjectModel(Outbound.name) private readonly outboundModel: Model<Outbound>,
  ) {}

  //  TODO: You need to validate item id, and calculate inventory before save
  async create(
    createOutboundDto: CreateOutboundDto,
  ): Promise<OutboundDocument> {
    try {
      return await this.outboundModel.create(createOutboundDto);
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
  }
}
