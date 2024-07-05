import { Owner, OwnerDocument } from '@app/common/models/owner.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OwnerService {
    constructor(
        @InjectModel(Owner.name) private ownerModel: Model<OwnerDocument>
    ) {}
    
    async getOwnerByEmail(email: string) {
        return this.ownerModel.findOne({ email })
    }

    async createOwner(user: Owner) {
        return this.ownerModel.create(user)
    }
}
