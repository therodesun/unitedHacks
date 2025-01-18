import { TokenTypeEnum } from '../enums';

export interface IToken {
  id: string;
  token: string;
  type: TokenTypeEnum;
  ownerId: string;
  session: string;
  createdAt: Date;
  updatedAt: Date;
}
