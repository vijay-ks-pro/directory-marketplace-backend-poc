import { IsBoolean, IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    password: string

    @IsOptional()
    @IsBoolean()
    isSeller: boolean
}
