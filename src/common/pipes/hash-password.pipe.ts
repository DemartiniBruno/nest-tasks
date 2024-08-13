import { Injectable, PipeTransform } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { UserService } from "src/modules/user/user.service";

@Injectable()
export class HashPasswordPipe implements PipeTransform{
    constructor(
        private readonly userService: UserService
    ){}
    
    async transform(password: string) {
        const hash = await bcrypt.hash(password, process.env.BCRYPT_SALT)
        return hash
    }
}