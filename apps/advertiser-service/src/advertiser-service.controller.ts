import { Controller, Get } from '@nestjs/common';
import { AdvertiserServiceService } from './advertiser-service.service';

@Controller()
export class AdvertiserServiceController {
  constructor(private readonly advertiserServiceService: AdvertiserServiceService) {}

  @Get()
  getHello(): string {
    return this.advertiserServiceService.getHello();
  }
}
