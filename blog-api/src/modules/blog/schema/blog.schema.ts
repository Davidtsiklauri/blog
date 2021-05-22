import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlogDocument = Blog & Document;

@Schema()
export class Blog {
  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, type: String })
  created_at: string;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ type: String })
  update_at: string;

  @Prop({ type: String, required: true })
  author: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
