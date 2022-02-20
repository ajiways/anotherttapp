import { HttpException, HttpStatus } from '@nestjs/common';
import { IErrArr } from '../interfaces/errors-arr.interface';

export class ValidationException extends HttpException {
  constructor(response: IErrArr) {
    super(response, HttpStatus.BAD_REQUEST);
  }
}
