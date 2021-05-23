import { Pagination } from './../../base/dto/pagination.dto';
import { Type } from 'class-transformer';
import { AddRequestBody } from './add.dto';
import { IsNotEmpty, ValidateNested } from 'class-validator';

export class SearchRequestDTO extends AddRequestBody {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Pagination)
  pagination: Pagination;
}
