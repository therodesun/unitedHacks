import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  isNotEmpty,
  isString,
  isUUID,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'idArrayStringValidator', async: false })
export class IdArrayStringValidator implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    try {
      if (typeof value !== 'string') {
        return false;
      }

      if (value?.trim() !== '') {
        const splittedArray = value?.split(',');
        for (const element of splittedArray) {
          if (
            !(
              isNotEmpty(element?.trim()) &&
              isString(element?.trim()) &&
              isUUID(element?.trim())
            )
          ) {
            return false;
          }
        }
      }

      return true;
    } catch (e) {
      return false;
    }
  }
}

export function IsIdArrayString(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isIdArrayString',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IdArrayStringValidator,
    });
  };
}
