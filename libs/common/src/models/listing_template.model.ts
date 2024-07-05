import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TemplateRow, WidgetType } from '../types/listing_template.types';

@Schema({ timestamps: false, id: false, _id: false })
class TemplateWidgetData {
    @Prop({ type: String, required: true })
    widgetId: string;

    @Prop({ type: String, required: true })
    widgetType: WidgetType;

    @Prop({ type: String, required: false, default: null })
    customWidgetName: string | null;

    @Prop({ type: Object, required: true })
    data: Record<string, any> | Record<string, any>[];
}

export type ListingTemplateDocument = ListingTemplate & Document;

@Schema({ timestamps: true })
export class ListingTemplate {
    _id: string;

    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: [Object], required: true })
    data: TemplateRow[];

    @Prop({ type: [TemplateWidgetData], required: true })
    widgetData: TemplateWidgetData[];
}

export const ListingTemplateSchema = SchemaFactory.createForClass(ListingTemplate);
