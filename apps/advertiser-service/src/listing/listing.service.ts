import { Injectable } from '@nestjs/common';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { Listing, ListingDocument } from '@app/common/models/listing.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoId } from '@app/common/types';

@Injectable()
export class ListingService {
    constructor(
        @InjectModel(Listing.name) private listingModel: Model<ListingDocument>,
    ) {}
    
    async createListing(data: CreateListingDto, thumbnail: string, userId: MongoId | string) {
        return this.listingModel.create({ ...data, thumbnail, user: userId });
    }

    async getAllListings(userId: MongoId | string) {
        return this.listingModel.find({ user: userId })
            .select(['-templateAnswer'])
            .populate('template', ['_id', 'name']);
    }

    async getListingById(id: MongoId) {
        return this.listingModel.findById(id);
    }

    async updateListing(id: MongoId, data: UpdateListingDto, thumbnail: string) {
        return this.listingModel.findByIdAndUpdate(id, { ...data, thumbnail }, { new: true });
    }

    async deleteListing(id: MongoId) {
        return this.listingModel.findByIdAndDelete(id);
    }
}
