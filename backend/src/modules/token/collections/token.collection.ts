import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { getTime } from 'src/modules/shared/utils';
import { TokenTypeEnum } from '../types/enums';

export type TokenDocument = HydratedDocument<Token>;

@Schema({
  validateBeforeSave: true,
  timestamps: { currentTime: () => getTime() },
  versionKey: false,
})
export class Token {
  @Prop({ type: String, trim: true, required: true })
  token: string;

  @Prop({ type: String, enum: TokenTypeEnum, required: true })
  type: TokenTypeEnum;

  @Prop({ type: String, trim: true, required: true })
  ownerId: string;

  @Prop({ type: String, trim: true, required: true, maxlength: 16 })
  session: string;

  createdAt?: Date;

  updatedAt?: Date;
}

const TokenSchema = SchemaFactory.createForClass(Token);
TokenSchema.method('toClient', function () {
  const obj: any = this.toObject();

  obj.id = obj._id;
  delete obj._id;

  return obj;
});

export { TokenSchema };
