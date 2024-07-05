import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JWTService } from '@app/common/jwt-service';
import * as bcrypt from 'bcrypt-nodejs';
import { User } from '@app/common/models/user.model';

@Controller('/auth/customer')
export class CustomerController {
    constructor(
        private readonly customerService: CustomerService,
        private readonly jwtService: JWTService,
    ) {}

    @Post('/login')
    async login(@Body() data: LoginDto) {
        const user = await this.customerService.getUserByEmail(data.email);
        
        if(user == null) {
            return {
                success: false,
                statusCode: "INVALID_CREDENTIALS",
            };
        }

        const match = bcrypt.compareSync(data.password, user.password);

        if(!match) {
            return {
                success: false,
                statusCode: "INVALID_CREDENTIALS",
            };
        }

        const token = this.jwtService.generateToken({ 
            email: user.email,
            userId: user._id, 
            userName: user.name,
            role: user.role
        });

        return {
            success: true,
            data: {
                token,
                user: {
                    name: user.name,
                    userId: user._id,
                    email: user.email,
                    role: user.role
                }
            },
            message: "LOGIN_SUCCESS",
        };
    }

    @Post('/register')
    async register(@Body() data: RegisterDto) {
        try {
            const toBeCreatedUser = new User();
            toBeCreatedUser.email = data.email;
            toBeCreatedUser.name = data.name;
            toBeCreatedUser.password = bcrypt.hashSync(data.password);
            toBeCreatedUser.role = data.isSeller ? 'ADVERTISER' : 'CUSTOMER';

            const user = await this.customerService.createUser(toBeCreatedUser);

            if(user == null) {
                return {
                    success: false,
                    statusCode: "INVALID_CREDENTIALS",
                };
            }

            const token = this.jwtService.generateToken({ 
                email: user.email,
                userId: user._id, 
                userName: user.name,
                role: user.role
            });
    
            return {
                success: true,
                data: {
                    token,
                    user: {
                        name: user.name,
                        userId: user._id,
                        email: user.email,
                        role: user.role
                    }
                },
                message: "REGISTRATION_SUCCESS",
            };

        } catch(error) {
            if (error && error.code == 11000) {
                return {
                    success: false,
                    statusCode: "USER_ALREADY_EXISTS",
                };
            }
            return {
                success: false,
                statusCode: "GENRIC_ERROR",
            };
        }
    }
}
