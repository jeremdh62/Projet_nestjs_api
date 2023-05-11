import { IsDefined, IsString } from "class-validator";

export class LoginRequest {
  @IsDefined()
  @IsString()
  public email: string;

  @IsDefined()
  @IsString()
  public password: string;
}
