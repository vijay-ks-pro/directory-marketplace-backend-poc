import { TemplateRow, TemplateWidgetData } from "@app/common/types/listing_template.types";
import { IsArray, IsNotEmpty, IsOptional } from "class-validator";

export class CreateListingTemplateDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @IsArray()
    data: TemplateRow[]

    @IsOptional()
    @IsArray()
    widgetData: TemplateWidgetData[]
}
