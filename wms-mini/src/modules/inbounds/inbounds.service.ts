import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { options } from 'src/config/plain.config';
import { Status } from 'src/enums/status.enum';
import { BadRequestException } from 'src/exceptions/bad.request.exception';
import { CreateInboundDto } from './dto/create.inbound.dto';
import { FindingOptionInboundDto } from './dto/finding.option.inbound.dto';
import { UpdateStatusInboundDto } from './dto/update.status.inbound.dto';
import { Inbound, InboundDocument } from './inbound.schema';

@Injectable()
export class InboundsService {
  constructor(
    @InjectModel(Inbound.name) private readonly inboundModel: Model<Inbound>,
  ) {}

  async create(createInboundDto: CreateInboundDto): Promise<InboundDocument> {
    const newCreateInboundDto = plainToInstance(
      CreateInboundDto,
      createInboundDto,
      options,
    );
    try {
      return await this.inboundModel.create(newCreateInboundDto);
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
  }

  async updateInboundStatus(
    id: string,
    updateStatusInboundDto: UpdateStatusInboundDto,
  ): Promise<UpdateWriteOpResult> {
    const status: string = updateStatusInboundDto.status;
    if (status !== Status.New)
      throw new BadRequestException('Only NEW accepted');
    try {
      return await this.inboundModel.updateOne({ _id: id }, { status: status });
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
  }

  async findByOption(
    findingOptionInboundDto: FindingOptionInboundDto,
  ): Promise<InboundDocument[]> {
    const newFindingOptionInboundDto = plainToInstance(
      FindingOptionInboundDto,
      findingOptionInboundDto,
      options,
    );
    try {
      return await this.inboundModel.find(newFindingOptionInboundDto).exec();
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
  }
}
