import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OwnerDocument = Owner & Document;

@Schema({ timestamps: true })
export class Owner {
    _id: string;

    @Prop({ type: String, required: true })
    name: string;

    @Prop({ unique: true, required: true })
    email: string;

    @Prop({ type: String, required: true })
    password: string;
}

export const OwnerSchema = SchemaFactory.createForClass(Owner);
