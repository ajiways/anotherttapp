import { HttpStatus } from '@nestjs/common';
import { BaseEntity } from 'typeorm';

export interface ServiceResponse<Entity = void> {
  status: HttpStatus;
  message: string;
  entity?: BaseEntity;
  entities?: Entity[];
  token?: string;
}
