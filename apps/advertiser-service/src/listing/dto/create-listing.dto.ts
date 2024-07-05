import { WidgetAnswer } from "@app/common/types/listing_template.types"
import { IsArray, IsMongoId, IsNotEmpty, IsNumber } from "class-validator"

export class CreateListingDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @IsNumber()
    price: number

    @IsNotEmpty()
    @IsMongoId()
    template: number

    @IsNotEmpty()
    @IsArray()
    templateAnswer: WidgetAnswer[]
}
