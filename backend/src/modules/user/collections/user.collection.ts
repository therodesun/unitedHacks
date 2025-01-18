import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { getTime } from 'src/modules/shared/utils';
import { UserRoleEnum } from '../types/enums';

export type UserDocument = HydratedDocument<User>;

@Schema({
  validateBeforeSave: true,
  timestamps: { currentTime: () => getTime() },
  versionKey: false,
})
export class User {
  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: String, enum: UserRoleEnum, required: true })
  role: UserRoleEnum;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  createdAt?: Date;

  updatedAt?: Date;
}

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.method('toClient', function () {
  const obj: any = this.toObject();

  obj.id = obj._id;
  delete obj._id;

  return obj;
});

export { UserSchema };
