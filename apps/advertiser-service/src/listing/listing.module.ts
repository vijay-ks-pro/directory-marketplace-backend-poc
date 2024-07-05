import { Module } from '@nestjs/common';
import { ListingService } from './listing.service';
import { ListingController } from './listing.controller';
import { TenancyModule } from '@app/multi-tenancy';
import { Listing, ListingSchema } from '@app/common/models/listing.model';

@Module({
    imports: [
        TenancyModule.forFeature([{ name: Listing.name, schema: ListingSchema }]),
    ],
    controllers: [ListingController],
    providers: [ListingService],
})
export class ListingModule {}
