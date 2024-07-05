import { Listing, ListingDocument } from '@app/common/models/listing.model';
import { ListingTemplate, ListingTemplateDocument } from '@app/common/models/listing_template.model';
import { MongoId } from '@app/common/types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ListingService {
    constructor(
        @InjectModel(Listing.name) private listingModel: Model<ListingDocument>,
        @InjectModel(ListingTemplate.name) private listingTemplateModel: Model<ListingTemplateDocument>,
    ) {}
    
    async getAllListings() {
        return this.listingModel.find()
            .select(['-templateAnswer', '-template']);
    }

    async getListing(id: MongoId) {
        return this.listingModel.findById(id)
            .populate('template');
    }
}
