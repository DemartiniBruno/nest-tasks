import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { UniqueEmail } from "src/common/decorators/unique-email.validator";

export class CreateUserDto {

    @IsNotEmpty()
    name:string;

    @UniqueEmail({message:'Email já cadastrado'})
    @IsEmail()
    email:string;

    @MinLength(6)
    password:string
}
