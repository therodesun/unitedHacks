import { ActionType } from '../types/action-type.enum';

export interface IAction {
  id: string;
  type: ActionType;
  likedUserId: string;
  likedBy: string;
  createdAt?: Date;
  updatedAt?: Date;
}
