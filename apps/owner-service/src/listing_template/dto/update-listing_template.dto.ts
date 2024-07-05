import { PartialType } from '@nestjs/mapped-types';
import { CreateListingTemplateDto } from './create-listing_template.dto';

export class UpdateListingTemplateDto extends PartialType(CreateListingTemplateDto) {}
