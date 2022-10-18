interface IPagination {
  take: number;
  skip: number;
  page: number;
  order: 'ASC' | 'DESC';
}

interface IMeta {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export { IPagination, IMeta };
