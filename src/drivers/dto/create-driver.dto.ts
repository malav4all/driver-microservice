/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class DocumentDetailDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  downloadUrl: string;
}

export class CreateDriverDto {
  @IsString()
  @IsNotEmpty()
  driverName: string;

  @IsString()
  @IsNotEmpty()
  address1: string;

  @IsString()
  @IsOptional()
  address2: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsNumber()
  @IsNotEmpty()
  pincode: number;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  aadharNo: string;

  @IsString()
  @IsNotEmpty()
  panNo: string;

  @IsString()
  @IsNotEmpty()
  dlNo: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DocumentDetailDto)
  @IsOptional()
  documents: DocumentDetailDto[];
}
