import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  isUUID,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'idArrayValidator', async: false })
export class IdArrayValidator implements ValidatorConstraintInterface {
  validate(data: any): boolean {
    try {
      if (data && data?.length) {
        for (let d of data) {
          if (!isUUID(d)) {
            return false;
          }

          d = d?.trim();
        }
      }

      return true;
    } catch (e) {
      return false;
    }
  }
}

export function IsIdArray(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isIdArray',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IdArrayValidator,
    });
  };
}
