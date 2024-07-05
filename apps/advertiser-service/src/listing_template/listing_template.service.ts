import { ListingTemplate, ListingTemplateDocument } from '@app/common/models/listing_template.model';
import { MongoId } from '@app/common/types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ListingTemplateService {
    constructor(
        @InjectModel(ListingTemplate.name) private listingTemplateModel: Model<ListingTemplateDocument>,
    ) {}
    
    async getAllListingTemplates() {
        return this.listingTemplateModel.find()
            .select(['-data', '-widgetData']);
    }

    getListingTemplateById(id: MongoId) {
        return this.listingTemplateModel.findById(id);
    }
}
