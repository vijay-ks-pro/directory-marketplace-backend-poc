import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { WidgetAnswer } from '../types/listing_template.types';
import { ListingTemplate } from './listing_template.model';
import { MongoId } from '../types';
import { User } from './user.model';

export type ListingDocument = Listing & Document;

@Schema({ timestamps: true })
export class Listing {
    _id: string;

    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: Number, required: true })
    price: number;

    @Prop({ type: String, required: false, default: '' })
    thumbnail: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: User.name })
    user: MongoId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: ListingTemplate.name })
    template: MongoId;

    @Prop({ type: [Object], required: true })
    templateAnswer: WidgetAnswer[];
}

export const ListingSchema = SchemaFactory.createForClass(Listing);
