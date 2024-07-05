import { IsBoolean, IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    password: string
}
