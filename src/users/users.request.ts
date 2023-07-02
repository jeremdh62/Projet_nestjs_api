import { IsDate, IsDefined, IsOptional, IsString, IsEmail } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRequest {
  @IsDefined()
  @IsString()
  @ApiProperty()
  public name: string;

  @IsDefined()
  @IsString()
  @ApiProperty()
  @IsEmail()
  public email: string;

  @IsDefined()
  @IsString()
  @ApiProperty()
  public password: string;
}

export class UpdateUserRequest {
  @IsOptional()
  @IsString()
  @ApiProperty()
  public name: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  public email: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  public password: string;
}
