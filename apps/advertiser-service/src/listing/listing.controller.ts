import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ListingService } from './listing.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { MongoId } from '@app/common/types';
import { JWTUserData, UserInfo } from '@app/common/decorators/userInfo';

@Controller('/advertiser/listing')
export class ListingController {
    constructor(private readonly listingService: ListingService) {}

    @Post('/')
    @UsePipes(new ValidationPipe({ transform: true })) 
    async createListing(@UserInfo() userInfo: JWTUserData, @Body() data: CreateListingDto) {
        let thumbnail = this.getThumbnail(data.templateAnswer);
        const result = await this.listingService.createListing(data, thumbnail, userInfo.userId);
        return {
            success: true,
            data: result,
        }
    }

    @Get('/')
    @UsePipes(new ValidationPipe({ transform: true })) 
    async getAllListings(@UserInfo() userInfo: JWTUserData) {
        const result = await this.listingService.getAllListings(userInfo.userId);
        return {
            success: true,
            data: result,
        }
    }

    @Get('/:listingId')
    @UsePipes(new ValidationPipe({ transform: true })) 
    async getListing(@Param('listingId') id: MongoId) {
        const result = await this.listingService.getListingById(id);
        return {
            success: true,
            data: result,
        }
    }

    @Put('/:listingId')
    @UsePipes(new ValidationPipe({ transform: true })) 
    async updateListing(@Param('listingId') id: MongoId, @Body() data: UpdateListingDto) {
        let thumbnail = this.getThumbnail(data.templateAnswer);
        const result = await this.listingService.updateListing(id, data, thumbnail);
        return {
            success: true,
            data: result,
        }
    }

    @Delete('/:listingId')
    @UsePipes(new ValidationPipe({ transform: true })) 
    async deleteListing(@Param('listingId') id: MongoId) {
        const result = await this.listingService.deleteListing(id);
        return {
            success: true,
            message: 'Listing deleted successfully!',
        }
    }

    getThumbnail(templateAnswers: CreateListingDto['templateAnswer']) {
        let thumbnail = '';
        templateAnswers.forEach(answer => {
            if(answer.type == 'IMAGE_SECTION') {
                thumbnail = answer.data?.list[0]?.path;
            }
        })
        return thumbnail;
    }
}
