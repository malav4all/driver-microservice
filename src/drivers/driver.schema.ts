import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class DocumentDetail {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  downloadUrl: string;
}

const DocumentDetailSchema = SchemaFactory.createForClass(DocumentDetail);

@Schema({ timestamps: true })
export class Driver extends Document {
  @Prop({ required: true })
  driverName: string;

  @Prop({ required: true })
  address1: string;

  @Prop()
  address2: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  pincode: number;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  aadharNo: string;

  @Prop({ required: true })
  panNo: string;

  @Prop({ required: true })
  dlNo: string;

  @Prop({ required: true })
  status: string;

  @Prop({ type: [DocumentDetailSchema], default: [] })
  documents: DocumentDetail[];
}

export const DriverSchema = SchemaFactory.createForClass(Driver);
