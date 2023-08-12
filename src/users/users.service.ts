import { Injectable,BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Users, Prisma} from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class UsersService{
    constructor(private prisma: PrismaService) { }

    async findByEmail(email : Prisma.UsersWhereUniqueInput) : Promise<Users>{
        return await this.prisma.users.findUnique({
            where: email
        })
    }

    async comparePassword(loginPassword:string , userPassword:string){
        return await bcrypt.compare(loginPassword,userPassword)
    }

    async user(
        userWhereUniqueInput: Prisma.UsersWhereUniqueInput,
    ): Promise<Users | null> {
        return this.prisma.users.findUnique({
            where: userWhereUniqueInput,
        })
    }

    async createUser(createUserDto: CreateUserDto): Promise<Users> {
        const registred = await this.findByEmail({email: createUserDto.email})

        if(registred) throw new BadRequestException('O usuário já está registrado na base de dados.',);

        return this.prisma.users.create({
          data:{
            ...createUserDto,
            email: createUserDto.email.toLowerCase(),
            password: await bcrypt.hash(createUserDto.password,10)
          }
        });
    }

    async updateUser(params: {
        where: Prisma.UsersWhereUniqueInput;
        data: Prisma.UsersUpdateInput;
        }): Promise<Users> {
        const { where, data } = params;
        return this.prisma.users.update({
            data,
            where,
        });
    }
    async deleteUser(where: Prisma.UsersWhereUniqueInput): Promise<Users> {
        return this.prisma.users.delete({
          where,
        });
    }
}