import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Driver } from './driver.schema';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Injectable()
export class DriversService {
  constructor(@InjectModel(Driver.name) private driverModel: Model<Driver>) {}

  async create(createDriverDto: CreateDriverDto): Promise<Driver> {
    try {
      const existingDriver = await this.driverModel.findOne({
        driverName: createDriverDto.driverName,
        aadharNo: createDriverDto.aadharNo,
      });

      if (existingDriver) {
        throw new BadRequestException(
          `Driver with name "${createDriverDto.driverName}" and Aadhar number "${createDriverDto.aadharNo}" already exists`
        );
      }

      const driver = new this.driverModel(createDriverDto);
      return await driver.save();
    } catch (error: any) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to create driver');
    }
  }

  async findAll(
    page: number,
    limit: number
  ): Promise<{ data: Driver[]; total: number }> {
    try {
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.driverModel.find().skip(skip).limit(limit).exec(),
        this.driverModel.countDocuments().exec(),
      ]);
      return { data, total };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch drivers');
    }
  }

  async findOne(id: string): Promise<Driver> {
    try {
      const driver = await this.driverModel.findById(id).exec();
      if (!driver) {
        throw new NotFoundException(`Driver with ID ${id} not found`);
      }
      return driver;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch the driver');
    }
  }

  async update(id: string, updateDriverDto: UpdateDriverDto): Promise<Driver> {
    try {
      const driver = await this.driverModel
        .findByIdAndUpdate(id, updateDriverDto, { new: true })
        .exec();
      if (!driver) {
        throw new NotFoundException(`Driver with ID ${id} not found`);
      }
      return driver;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to update the driver');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const result = await this.driverModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException(`Driver with ID ${id} not found`);
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete the driver');
    }
  }

  async search(
    page: number,
    limit: number,
    searchText: string
  ): Promise<{ data: Driver[]; total: number }> {
    try {
      const skip = (page - 1) * limit;
      const query = {
        $or: [
          { driverName: new RegExp(searchText, 'i') },
          { city: new RegExp(searchText, 'i') },
          { state: new RegExp(searchText, 'i') },
        ],
      };

      const [data, total] = await Promise.all([
        this.driverModel.find(query).skip(skip).limit(limit).exec(),
        this.driverModel.countDocuments(query).exec(),
      ]);
      return { data, total };
    } catch (error) {
      throw new InternalServerErrorException('Failed to search drivers');
    }
  }
}
