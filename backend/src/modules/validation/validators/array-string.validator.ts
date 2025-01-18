import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  isNotEmpty,
  isString,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'arrayStringValidator', async: false })
export class ArrayStringValidator implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    try {
      if (typeof value !== 'string') {
        return false;
      }

      const splittedArray = value?.split(',');

      for (const element of splittedArray) {
        if (!(isNotEmpty(element?.trim()) && isString(element?.trim()))) {
          return false;
        }
      }

      return true;
    } catch (e) {
      return false;
    }
  }
}

export function IsArrayString(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isArrayString',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: ArrayStringValidator,
    });
  };
}
