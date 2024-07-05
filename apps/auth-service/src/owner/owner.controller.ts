import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Owner } from '@app/common/models/owner.model';
import * as bcrypt from 'bcrypt-nodejs';
import { JWTService } from '@app/common/jwt-service';
import { USER_OWNER } from '@app/common/constants';

@Controller('/auth/owner')
export class OwnerController {
    constructor(
        private readonly ownerService: OwnerService, 
        private readonly jwtService: JWTService
    ) {}
  
    @Post('/login')
    async login(@Body() data: LoginDto) {
        const user = await this.ownerService.getOwnerByEmail(data.email);
        
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
            role: USER_OWNER
        });

        return {
            success: true,
            data: {
                token,
                user: {
                    name: user.name,
                    userId: user._id,
                    email: user.email,
                    role: USER_OWNER
                }
            },
            message: "LOGIN_SUCCESS",
        };
    }

    @Post('/register')
    async register(@Body() data: RegisterDto) {
        try {
            const toBeCreatedUser = new Owner();
            toBeCreatedUser.email = data.email;
            toBeCreatedUser.name = data.name;
            toBeCreatedUser.password = bcrypt.hashSync(data.password);

            const user = await this.ownerService.createOwner(toBeCreatedUser);

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
                role: USER_OWNER
            });
    
            return {
                success: true,
                data: {
                    token,
                    user: {
                        name: user.name,
                        userId: user._id,
                        email: user.email,
                        role: USER_OWNER
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
