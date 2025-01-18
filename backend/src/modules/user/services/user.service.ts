import { HttpException, Injectable } from '@nestjs/common';
import { DbContext } from 'src/modules/database/context/db-context';
import { CustomLoggerService } from 'src/modules/logger/services';
import { ErrorCodeEnum } from 'src/modules/shared/types/enums';
import { UserRoleEnum } from '../types/enums';
import { IUser } from '../types/interfaces';

@Injectable()
export class UserService {
  constructor(
    private readonly dbContext: DbContext,
    private readonly logger: CustomLoggerService,
  ) {}

  async createUser(
    email: string,
    firstName: string,
    lastName: string,
    role: UserRoleEnum,
  ): Promise<IUser> {
    const entity = new this.dbContext.users({
      email: email?.trim(),
      firstName: firstName?.trim(),
      lastName: lastName?.trim(),
      role,
    });

    try {
      await entity.save();
      return entity;
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(ErrorCodeEnum.FAILED_OPERATION, 400, {
        description: 'Failed to create user',
      });
    }
  }

  async getUserById(id: string): Promise<IUser> {
    try {
      const user = await this.dbContext.users.findById(id);
      return user;
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(ErrorCodeEnum.FAILED_OPERATION, 400, {
        description: 'Failed to get user',
      });
    }
  }

  async getUserByEmail(email: string): Promise<IUser> {
    try {
      const user = await this.dbContext.users.findOne({ email });
      return user;
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(ErrorCodeEnum.FAILED_OPERATION, 400, {
        description: 'Failed to get user',
      });
    }
  }
}
