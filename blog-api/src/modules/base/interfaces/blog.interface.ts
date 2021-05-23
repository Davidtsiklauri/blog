export interface IPagination {
  page: number;
  limit: number;
}

export abstract class Posts<T> {
  data: T;
  pagination: IPagination;
}
