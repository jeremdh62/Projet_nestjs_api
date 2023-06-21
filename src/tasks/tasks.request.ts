import { IsDefined, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskRequest {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public title: string;

  @IsDefined()
  @IsString()
  @ApiProperty()
  public description: string;

}

export class UpdateTaskRequest {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @IsOptional()
  public title: string;

  @IsDefined()
  @IsString()
  @ApiProperty()
  @IsOptional()
  public description: string;

}

export class AssignUserToTaskRequest {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public taskId: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public userId: string;
}

export class UpdateTaskStatusRequest {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public status: string;
}