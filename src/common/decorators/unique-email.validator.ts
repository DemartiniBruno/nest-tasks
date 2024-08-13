import { Inject, Injectable } from "@nestjs/common";
import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { UserService } from "src/modules/user/user.service";

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueEmailValidator implements ValidatorConstraintInterface{
    constructor(
        private readonly userService:UserService
    ){}

    async validate(value: any): Promise<boolean> {

        const user = await this.userService.teste(value) 
        if(user!==null){
            return false 
        }
        
        return true
    }
}

export const UniqueEmail = (validationOptions: ValidationOptions)=>{
    return (objeto: object, propriedade: string) => {
        registerDecorator({
          target: objeto.constructor,
          propertyName: propriedade,
          options: validationOptions,
          constraints: [],
          validator: UniqueEmailValidator,
        });
    }
}