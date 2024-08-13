import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class FindUserDto {

    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @MinLength(6)
    password:string
}
