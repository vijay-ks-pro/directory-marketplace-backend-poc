import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';
import { Owner, OwnerSchema } from '@app/common/models/owner.model';
import { TenancyModule } from '@app/multi-tenancy';
import { JWTService } from '@app/common/jwt-service';

@Module({
    imports: [
        TenancyModule.forFeature([{ name: Owner.name, schema: OwnerSchema }]),
    ],
    controllers: [OwnerController],
    providers: [OwnerService, JWTService],
})
export class OwnerModule {}
