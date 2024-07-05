import { Module } from '@nestjs/common';
import { ListingTemplateService } from './listing_template.service';
import { ListingTemplateController } from './listing_template.controller';
import { ListingTemplate, ListingTemplateSchema } from '@app/common/models/listing_template.model';
import { TenancyModule } from '@app/multi-tenancy';

@Module({
    imports: [
        TenancyModule.forFeature([{ name: ListingTemplate.name, schema: ListingTemplateSchema }]),
    ],
    controllers: [ListingTemplateController],
    providers: [ListingTemplateService],
})
export class ListingTemplateModule {}
