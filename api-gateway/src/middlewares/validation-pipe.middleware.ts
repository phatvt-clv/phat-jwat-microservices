/* eslint-disable @typescript-eslint/ban-types */
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype, value);
    const errors = await validate(object);

    //throw 1 error message
    if (errors.length === 1) {
      const firstErrorConstraint = errors[0]?.constraints;
      for (const error in firstErrorConstraint) {
        throw new BadRequestException(firstErrorConstraint[error]);
      }
    }

    //throw multiple error messages
    if (errors.length > 1) {
      const errorMessageList = [];
      for (const error of errors) {
        const currErrorConstraint = error?.constraints;
        for (const message in currErrorConstraint) {
          errorMessageList.push(currErrorConstraint[message]);
        }
      }
      throw new BadRequestException(errorMessageList);
    }

    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
