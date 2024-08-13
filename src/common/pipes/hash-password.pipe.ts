import { Injectable, PipeTransform } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashPasswordPipe implements PipeTransform{
    async transform(password: string) {

        const hash = await bcrypt.hash(password, process.env.BCRYPT_SALT)
        return hash
    }
}