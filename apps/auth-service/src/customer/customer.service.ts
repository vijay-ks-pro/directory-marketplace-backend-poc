import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@app/common/models/user.model';
import { Model } from 'mongoose';

@Injectable()
export class CustomerService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {}
    
    async getUserByEmail(email: string) {
        return this.userModel.findOne({ email })
    }

    async createUser(user: User) {
        return this.userModel.create(user)
    }
}
