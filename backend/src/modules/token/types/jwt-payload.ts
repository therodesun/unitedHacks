import { UserRoleEnum } from 'src/modules/user/types/enums';

export class JwtPayload {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRoleEnum;
}
