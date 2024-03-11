import {
  ArgumentMetadata,
  ParseUUIDPipe,
} from '@nestjs/common';

export class CustomUUIDPipe extends ParseUUIDPipe {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    try {
      return await super.transform(value, metadata);
    } catch {
      throw this.exceptionFactory(
        `Invalid ${value} format. Please provide a valid UUID.`,
      );
    }
  }
}
