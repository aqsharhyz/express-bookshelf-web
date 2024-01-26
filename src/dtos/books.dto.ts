import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  summary: string;

  @IsString()
  @IsNotEmpty()
  publisher: string;

  @IsNumber()
  @IsNotEmpty()
  pageCount: number;

  @IsNumber()
  @IsNotEmpty()
  readPage: number;

  @IsBoolean()
  @IsNotEmpty()
  reading: boolean;

  @IsBoolean()
  @IsOptional()
  finished?: boolean;
}

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsNumber()
  @IsOptional()
  year?: number;

  @IsString()
  @IsOptional()
  author?: string;

  @IsString()
  @IsOptional()
  summary?: string;

  @IsString()
  @IsOptional()
  publisher?: string;

  @IsNumber()
  @IsOptional()
  pageCount?: number;

  @IsNumber()
  @IsOptional()
  readPage?: number;

  @IsBoolean()
  @IsOptional()
  reading?: boolean;

  @IsBoolean()
  @IsOptional()
  finished?: boolean;
}
