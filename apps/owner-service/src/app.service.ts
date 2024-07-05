import { Injectable } from '@nestjs/common';

@Injectable()
export class OwnerService {
  getHello(): string {
    return 'Hello World!';
  }
}
