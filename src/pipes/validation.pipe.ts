import {
  ArgumentMetadata,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from '../exceptions/validation.exception';
import { IErrArr } from '../interfaces/errors-arr.interface';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToInstance(metadata.metatype, value);

    const errors = await validate(obj);

    const errArr: IErrArr = {
      status: HttpStatus.BAD_REQUEST,
      errors: [],
    };

    if (errors.length) {
      errors.forEach((err) => {
        errArr.errors.push(
          `${err.property} - ${Object.values(err.constraints).join(', ')}`,
        );
      });

      throw new ValidationException(errArr);
    }

    return value;
  }
}
