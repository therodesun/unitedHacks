import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { getTime } from 'src/modules/shared/utils';
import { ActionType } from '../types/action-type.enum';

export type ActionDocument = HydratedDocument<Action>;

@Schema({
  validateBeforeSave: true,
  timestamps: { currentTime: () => getTime() },
  versionKey: false,
})
export class Action {
  @Prop({ type: String, enum: ActionType, required: true })
  type: ActionType;

  @Prop({ type: String, required: true })
  likedUserId: string;

  @Prop({ type: String, required: true })
  likedBy: string;

  createdAt?: Date;

  updatedAt?: Date;
}

const ActionSchema = SchemaFactory.createForClass(Action);
ActionSchema.method('toClient', function () {
  const obj: any = this.toObject();

  obj.id = obj._id;
  delete obj._id;

  return obj;
});

export { ActionSchema };
