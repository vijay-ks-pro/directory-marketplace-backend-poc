import { Module } from '@nestjs/common';
import { MultiTenancyService } from './multi-tenancy.service';

@Module({
  providers: [MultiTenancyService],
  exports: [MultiTenancyService],
})
export class MultiTenancyModule {}
