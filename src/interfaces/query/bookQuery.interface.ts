import { searchingQuery } from './searchingQuery.interface';

export interface bookQuery {
  title?: searchingQuery;
  author?: searchingQuery;
  publisher?: searchingQuery;
  reading?: any;
  finished?: any;
  createdBy?: string;
}
