import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CustomValidationPipe
  extends ValidationPipe
  implements PipeTransform<any>
{
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype, value);
    value = object;

    const errors = await validate(object);
    if (errors.length > 0) {
      const errorMessages = [];
      errors.forEach((error) => {
        const message = Object.values(error.constraints).at(0);
        errorMessages.push(message);
      });
      throw new UnprocessableEntityException(errorMessages);
    }
    return value;
  }

  toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
