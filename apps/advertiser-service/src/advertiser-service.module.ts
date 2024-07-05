import { Module } from '@nestjs/common';
import { AdvertiserServiceController } from './advertiser-service.controller';
import { AdvertiserServiceService } from './advertiser-service.service';
import { ListingModule } from './listing/listing.module';
import { ListingTemplateModule } from './listing_template/listing_template.module';
import { ConfigModule } from '@nestjs/config';
import { TenancyModule } from '@app/multi-tenancy';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TenancyModule.forRoot(),
        ListingModule, 
        ListingTemplateModule
    ],
    controllers: [AdvertiserServiceController],
    providers: [AdvertiserServiceService],
})
export class AdvertiserServiceModule {}
