import { USER_ROLE } from '@/config';
import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, IsEnum, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  public password: string;

  @IsEnum(USER_ROLE)
  @IsOptional()
  public role?: string;
}

export class UpdateUserDataDto {
  @IsString()
  @IsOptional()
  public name?: string;

  @IsEmail()
  @IsOptional()
  public email?: string;
}

export class UpdateUserRoleDto {
  @IsEnum(['user', 'admin'])
  @IsNotEmpty()
  public role: string;
}

export class UpdateUserPasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  public password: string;
}

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
