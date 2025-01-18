import { UserRoleEnum } from '../enums';

export class GetMeResponseDto {
  firstName: string;
  lastName: string;
  email: string;
  role: UserRoleEnum;
}
