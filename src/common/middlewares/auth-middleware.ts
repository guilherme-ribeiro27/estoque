import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthMiddleware implements NestMiddleware{
    constructor(private readonly jwtService:JwtService, private readonly configService:ConfigService){}
    use(req:Request, res: Response, next: NextFunction){
        try {
            const {authorization} = req.headers;
            const token = authorization.split(" ")[1];
            
            const decoded = this.jwtService.verify(token,{
                secret: this.configService.get('JWT_SECRET')
            });
            req.user = decoded;
            next()
        } catch (error) {
            console.log(error)
            throw new BadRequestException('Token não informado.');
        }
    }
}