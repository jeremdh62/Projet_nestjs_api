import { IsDefined, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTaskRequest {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsDefined()
  @IsString()
  public description: string;

}

export class UpdateTaskRequest {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsDefined()
  @IsString()
  public description: string;

}
