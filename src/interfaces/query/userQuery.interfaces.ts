import { searchingQuery } from './searchingQuery.interface';

export interface userQuery {
  name?: searchingQuery;
  email?: searchingQuery;
  role?: any;
}
