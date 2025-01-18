import { UserRoleEnum } from '../enums';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  role: UserRoleEnum;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}
