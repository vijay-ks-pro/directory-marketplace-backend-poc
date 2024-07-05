import { Module } from '@nestjs/common';
import { OwnerController } from './app.controller';
import { OwnerService } from './app.service';
import { ListingTemplateModule } from './listing_template/listing_template.module';
import { ConfigModule } from '@nestjs/config';
import { TenancyModule } from '@app/multi-tenancy';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TenancyModule.forRoot(),
        ListingTemplateModule
    ],
    controllers: [OwnerController],
    providers: [OwnerService],
})
export class AppModule {}
