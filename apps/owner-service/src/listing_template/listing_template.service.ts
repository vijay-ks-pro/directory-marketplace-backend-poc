import { Injectable } from '@nestjs/common';
import { CreateListingTemplateDto } from './dto/create-listing_template.dto';
import { UpdateListingTemplateDto } from './dto/update-listing_template.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ListingTemplate, ListingTemplateDocument } from '@app/common/models/listing_template.model';
import { Model } from 'mongoose';
import { MongoId } from '@app/common/types';

@Injectable()
export class ListingTemplateService {
    constructor(
        @InjectModel(ListingTemplate.name) private listingTemplateModel: Model<ListingTemplateDocument>,
    ) {}

    async createListingTemplate(data: CreateListingTemplateDto) {
        return this.listingTemplateModel.create(data);
    }

    async getAllListingTemplates() {
        return this.listingTemplateModel.find()
            .select(['-data', '-widgetData']);
    }

    async getListingTemplateById(id: MongoId) {
        return this.listingTemplateModel.findById(id);
    }

    async updateListingTemplate(id: MongoId, data: UpdateListingTemplateDto) {
        return this.listingTemplateModel.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteListingTemplate(id: MongoId) {
        return this.listingTemplateModel.findByIdAndDelete(id);
    }
}
