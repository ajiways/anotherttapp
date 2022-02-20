import { HttpStatus } from '@nestjs/common';

export interface IErrArr {
  status: HttpStatus;
  errors: string[];
}
