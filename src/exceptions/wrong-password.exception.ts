import { NotFoundException } from '@nestjs/common';

export class WrongPasswordException extends NotFoundException {
  constructor(message: string) {
    super(message);
  }
}
