import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TokenDocument } from 'src/modules/token/collections';
import { IToken } from 'src/modules/token/types/interfaces';
import { UserDocument } from 'src/modules/user/collections';
import { IUser } from 'src/modules/user/types/interfaces';

@Injectable()
export class DbContext {
  @InjectModel('token')
  public readonly tokens: Model<TokenDocument & IToken>;

  @InjectModel('user')
  public readonly users: Model<UserDocument & IUser>;
}
