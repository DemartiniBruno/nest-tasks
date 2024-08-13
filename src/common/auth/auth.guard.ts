import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { UserPayload } from './auth.service';
import { JwtService } from '@nestjs/jwt';


export interface UserRequest extends Request{
  user:UserPayload
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService:JwtService
  ){}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const req = context.switchToHttp().getRequest<UserRequest>();

    // console.log(req)
    const token = this.getToken(req)

    if(!token){
      throw new UnauthorizedException('Erro de autenticação')
    }

    try {
      const payload: UserPayload = await this.jwtService.verifyAsync(token)
      req.user=payload
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('JWT inválido');
    }

    return true;
  }

  private getToken(req){ 
    // console.log(req.headers.authorization)
    if(!req.headers.authorization){
      throw new BadRequestException('Header de autorização não enviado')
    }
    const [tipo, token] = req.headers.authorization.split(' ') ?? []
    return tipo === 'Bearer' ? token : undefined
  }
}
