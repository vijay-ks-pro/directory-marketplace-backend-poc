import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { User, UserSchema } from '@app/common/models/user.model';
import { TenancyModule } from '@app/multi-tenancy';
import { JWTService } from '@app/common/jwt-service';

@Module({
    imports: [
        TenancyModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    controllers: [CustomerController],
    providers: [CustomerService, JWTService],
})
export class CustomerModule {}
