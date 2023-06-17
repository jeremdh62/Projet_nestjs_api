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

export class AssignUserToTaskRequest {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  public taskId: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  public userId: string;
}

export class UpdateTaskStatusRequest {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  public status: string;
}