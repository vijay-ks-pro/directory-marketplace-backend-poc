import { Injectable } from '@nestjs/common';

@Injectable()
export class AdvertiserServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
