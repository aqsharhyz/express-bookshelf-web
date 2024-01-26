export interface Book {
  _id?: string;
  title: string;
  year: number;
  author: string;
  summary: string;
  publisher: string;
  pageCount: number;
  readPage: number;
  reading: boolean;
  finished?: boolean;
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
}
