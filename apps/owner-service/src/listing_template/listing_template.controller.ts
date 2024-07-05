import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ListingTemplateService } from './listing_template.service';
import { CreateListingTemplateDto } from './dto/create-listing_template.dto';
import { UpdateListingTemplateDto } from './dto/update-listing_template.dto';
import { MongoId } from '@app/common/types';

@Controller('/owner/listing_template')
export class ListingTemplateController {
    constructor(private readonly listingTemplateService: ListingTemplateService) {}

    @Post('/')
    @UsePipes(new ValidationPipe({ transform: true })) 
    async createListingTemplate(@Body() data: CreateListingTemplateDto) {
        const result = await this.listingTemplateService.createListingTemplate(data);
        return {
            success: true,
            data: result,
        }
    }

    @Get('/')
    @UsePipes(new ValidationPipe({ transform: true })) 
    async getAllListingTemplates() {
        const result = await this.listingTemplateService.getAllListingTemplates();
        return {
            success: true,
            data: result,
        }
    }

    @Get('/:templateId')
    @UsePipes(new ValidationPipe({ transform: true })) 
    async getListingTemplateById(@Param('templateId') id: MongoId) {
        const result = await this.listingTemplateService.getListingTemplateById(id);
        return {
            success: true,
            data: result,
        }
    }

    @Put('/:templateId')
    @UsePipes(new ValidationPipe({ transform: true })) 
    async updateListingTemplate(@Param('templateId') id: MongoId, @Body() data: UpdateListingTemplateDto) {
        const result = await this.listingTemplateService.updateListingTemplate(id, data);
        return {
            success: true,
            data: result,
        }
    }

    @Delete('/:templateId')
    @UsePipes(new ValidationPipe({ transform: true })) 
    async deleteListingTemplate(@Param('templateId') id: MongoId) {
        const result = await this.listingTemplateService.deleteListingTemplate(id);
        return {
            success: true,
            message: 'Listing template deleted successfully!',
        }
    }
}
