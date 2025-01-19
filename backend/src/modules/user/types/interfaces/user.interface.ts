import { UserRoleEnum } from '../enums';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  role: UserRoleEnum;
  email: string;
  password: string;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
