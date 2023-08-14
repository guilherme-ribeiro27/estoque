import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware{
    constructor(private readonly jwtService:JwtService){}
    use(req:Request, res: Response, next: NextFunction){
        const {authorization} = req.headers;
        if(!authorization && !authorization.startsWith("Bearer")) throw new Error('Token não informado.');
        const token = authorization.split(" ")[1];
        const decoded = this.jwtService.verify(token);

        console.log(token);

        
    }
}