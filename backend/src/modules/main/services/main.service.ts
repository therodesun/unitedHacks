import { HttpException, Injectable } from '@nestjs/common';
import { DbContext } from 'src/modules/database/context/db-context';
import { ActionType } from '../types/action-type.enum';

@Injectable()
export class MainService {
  constructor(private readonly dbContext: DbContext) {}

  async getAllUsers() {
    const users: any = await this.dbContext.users.find();

    let imageIndex = 1;

    const result = [];

    for (const user of users) {
      result.push({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        education: user.education,
        skills: user.skills,
        experience: user.experience,
        location: user.location,
        salary: user.salary,
        profileImage: `https://i.pravatar.cc/150?img=${imageIndex++}`,
      });

      if (imageIndex > 70) {
        imageIndex = 0;
      }
    }

    // Fisher-Yates Shuffle
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
      [result[i], result[j]] = [result[j], result[i]]; // Swap elements
    }

    return result;
  }

  async action(action: ActionType, likedUserId: string, email: string) {
    if (action == ActionType.LIKE) {
      const user = await this.dbContext.users.findOne({
        email,
      });

      if (!user) {
        throw new HttpException('User not found', 404);
      }

      await this.dbContext.actions.create({
        type: action,
        likedUserId,
        likedBy: user.id,
      });

      // const existingActionForMatch = await this.dbContext.actions.findOne({
      //   type: ActionType.LIKE,
      //   likedUserId: user.id,
      //   likedBy: likedUserId,
      // });

      // if (existingActionForMatch) {
      //   return { matched: true };
      // } else {
      //   return { matched: false };
      // }

      const existingActionForMatch = Math.random() < 0.7;

      return { matched: existingActionForMatch };
    } else {
      return { matched: false };
    }
  }
}
