import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  Query,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { createApiResponse } from 'src/comman/utilis/response.util';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  async create(@Body() createDriverDto: CreateDriverDto) {
    try {
      await this.driversService.create(createDriverDto);
      return createApiResponse(
        true,
        HttpStatus.CREATED,
        'Driver added successfully'
      );
    } catch (error) {
      throw new HttpException(
        createApiResponse(
          false,
          HttpStatus.BAD_REQUEST,
          error.message,
          undefined,
          undefined,
          undefined,
          undefined,
          'Failed to add driver'
        ),
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get()
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    try {
      const result = await this.driversService.findAll(+page, +limit);
      return createApiResponse(
        true,
        HttpStatus.OK,
        'Drivers retrieved successfully',
        result.data,
        result.total,
        page,
        limit
      );
    } catch (error) {
      throw new HttpException(
        createApiResponse(
          false,
          HttpStatus.INTERNAL_SERVER_ERROR,
          error.message,
          undefined,
          undefined,
          undefined,
          undefined,
          'Failed to retrieve drivers'
        ),
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('search')
  async search(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('searchText') searchText = ''
  ) {
    try {
      const result = await this.driversService.search(
        +page,
        +limit,
        searchText
      );
      return createApiResponse(
        true,
        HttpStatus.OK,
        'Drivers search completed successfully',
        result.data,
        result.total,
        page,
        limit
      );
    } catch (error) {
      throw new HttpException(
        createApiResponse(
          false,
          HttpStatus.INTERNAL_SERVER_ERROR,
          error.message,
          undefined,
          undefined,
          undefined,
          undefined,
          'Failed to search drivers'
        ),
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const driver = await this.driversService.findOne(id);
      return createApiResponse(
        true,
        HttpStatus.OK,
        'Driver retrieved successfully',
        driver
      );
    } catch (error) {
      throw new HttpException(
        createApiResponse(
          false,
          HttpStatus.NOT_FOUND,
          error.message,
          undefined,
          undefined,
          undefined,
          undefined,
          'Driver not found'
        ),
        HttpStatus.NOT_FOUND
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDriverDto: UpdateDriverDto
  ) {
    try {
      await this.driversService.update(id, updateDriverDto);
      return createApiResponse(
        true,
        HttpStatus.OK,
        'Driver updated successfully'
      );
    } catch (error) {
      throw new HttpException(
        createApiResponse(
          false,
          HttpStatus.BAD_REQUEST,
          error.message,
          undefined,
          undefined,
          undefined,
          undefined,
          'Failed to update driver'
        ),
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.driversService.delete(id);
      return createApiResponse(
        true,
        HttpStatus.NO_CONTENT,
        'Driver deleted successfully'
      );
    } catch (error) {
      throw new HttpException(
        createApiResponse(
          false,
          HttpStatus.NOT_FOUND,
          error.message,
          undefined,
          undefined,
          undefined,
          undefined,
          'Failed to delete driver'
        ),
        HttpStatus.NOT_FOUND
      );
    }
  }
}
