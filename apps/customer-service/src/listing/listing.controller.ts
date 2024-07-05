import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ListingService } from './listing.service';
import { MongoId } from '@app/common/types';

@Controller('/customer/listing')
export class ListingController {
    constructor(private readonly listingService: ListingService) {}

    @Get('/')
    @UsePipes(new ValidationPipe({ transform: true })) 
    async getAllListings() {
        const result = await this.listingService.getAllListings();
        return {
            success: true,
            data: result
        }
    }

    @Get(':listingId')
    @UsePipes(new ValidationPipe({ transform: true })) 
    async getListing(@Param('listingId') id: MongoId) {
        const result = await this.listingService.getListing(id);
        return {
            success: true,
            data: result
        }
    }
}
