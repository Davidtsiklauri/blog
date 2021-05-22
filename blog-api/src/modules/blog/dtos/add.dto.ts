import { IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

class Data {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsString()
  created_at: string;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  author: string;
}

export class AddRequestBody {
  @Type(() => Data) data: Data;
}
