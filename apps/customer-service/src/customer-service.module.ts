import { Module } from '@nestjs/common';
import { CustomerServiceController } from './customer-service.controller';
import { CustomerServiceService } from './customer-service.service';
import { ListingModule } from './listing/listing.module';
import { ConfigModule } from '@nestjs/config';
import { TenancyModule } from '@app/multi-tenancy';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TenancyModule.forRoot(),
        ListingModule
    ],
    controllers: [CustomerServiceController],
    providers: [CustomerServiceService],
})
export class CustomerServiceModule {}
