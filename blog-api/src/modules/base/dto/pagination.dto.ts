import { IsNotEmpty, IsNumber } from 'class-validator';

export class Pagination {
  @IsNotEmpty()
  @IsNumber()
  page: number;
  @IsNotEmpty()
  @IsNumber()
  limit: number;

  extract() {
    return {
      skip: this.page,
      limit: this.limit,
    };
  }
}
