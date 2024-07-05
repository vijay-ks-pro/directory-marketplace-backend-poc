import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ListingTemplateService } from './listing_template.service';
import { MongoId } from '@app/common/types';

@Controller('/advertiser/listing_template')
export class ListingTemplateController {
  constructor(private readonly listingTemplateService: ListingTemplateService) {}

  @Get('/')
  @UsePipes(new ValidationPipe({ transform: true })) 
  async getAllListingTemplates() {
    const result = await this.listingTemplateService.getAllListingTemplates();
    return {
        success: true,
        data: result
    }
  }

  @Get('/:templateId')
  @UsePipes(new ValidationPipe({ transform: true })) 
  async getListingTemplateById(@Param('templateId') id: MongoId) {
    const result = await this.listingTemplateService.getListingTemplateById(id);
    return {
        success: true,
        data: result
    }
  }
}
