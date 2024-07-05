import { Module } from '@nestjs/common';
import { AuthServiceController } from './auth-service.controller';
import { AuthServiceService } from './auth-service.service';
import { CustomerModule } from './customer/customer.module';
import { OwnerModule } from './owner/owner.module';
import { ConfigModule } from '@nestjs/config';
import { TenancyModule } from '@app/multi-tenancy';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TenancyModule.forRoot(),
        CustomerModule, 
        OwnerModule
    ],
    controllers: [AuthServiceController],
    providers: [AuthServiceService],
})
export class AuthServiceModule {}
