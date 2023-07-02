import { IsDefined, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequest {
  @IsDefined()
  @IsString()
  @ApiProperty()
  public email: string;

  @IsDefined()
  @IsString()
  @ApiProperty()
  public password: string;
}
