import { Controller, Get } from '@nestjs/common';
import { OwnerService } from './app.service';

@Controller()
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Get()
  getHello(): string {
    return this.ownerService.getHello();
  }
}
