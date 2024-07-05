import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { USER_ADVERTISER, USER_CUSTOMER } from '../constants';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    _id: string;

    @Prop({ type: String, required: true })
    name: string;

    @Prop({ unique: true, required: true })
    email: string;

    @Prop({ type: String, required: true })
    password: string;

    @Prop({ type: String, enum: [USER_CUSTOMER, USER_ADVERTISER], required: true })
    role: typeof USER_CUSTOMER | typeof USER_ADVERTISER;
}

export const UserSchema = SchemaFactory.createForClass(User);
