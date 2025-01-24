import { Module } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverSchema, Driver } from './driver.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Driver.name, schema: DriverSchema }]),
  ],
  providers: [DriversService],
  controllers: [DriversController],
})
export class DriversModule {}
