import { Injectable } from '@nestjs/common';
import { DbContext } from 'src/modules/database/context/db-context';

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
    }

    return result;
  }
}
