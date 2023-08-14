import { Injectable , Body,NotFoundException,BadRequestException} from '@nestjs/common';
import { Users } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { AuthUserDto } from './dto/auth-user.dto';
import { UsersService } from '../users/users.service';
import { AuthUserResponseDto } from './dto/auth-user-response.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private readonly jwtService: JwtService,) { }

    async login(@Body() authUserDto: AuthUserDto):Promise<AuthUserResponseDto>{
        const user = await this.validateUser(authUserDto);
        if(!user) throw new BadRequestException('E-mail ou senha estão incorretos');

        const payload: AuthUserResponseDto = {
            id: user.id,
            name: user.name,
            email: user.email,
            access_token: this.jwtService.sign({
                id: user.id,
                userType: user.type
            }),
            user_type: user.type
        }
        return payload
    }

    async validateUser(login: AuthUserDto):Promise<Users>{
        const user = await this.usersService.findByEmail({email: login.email});

        if(!user) throw new NotFoundException('Usuário não encontrado');

        const matchPassword = await this.usersService.comparePassword(login.password, user.password);

        if(!matchPassword) return null;

        const userObject = { ...user }

        return userObject
    }
}
