import { IsDate, IsDefined, IsOptional, IsString } from "class-validator";

export class CreateUserRequest {
  @IsDefined()
  @IsString()
  public name: string;

  @IsDefined()
  @IsString()
  public email: string;

  @IsDefined()
  @IsString()
  public password: string;


  @IsOptional()
  @IsDate()
  public createdAt: Date;

  @IsOptional()
  @IsDate()
  public updatedAt: Date;
}

export class UpdateUserRequest {
  @IsOptional()
  @IsString()
  public name: string;

  @IsOptional()
  @IsString()
  public email: string;

  @IsOptional()
  @IsString()
  public password: string;
}
