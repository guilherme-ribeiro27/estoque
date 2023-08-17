import { Injectable,BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Users, Prisma} from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService{
    constructor(private prisma: PrismaService) { }

    async findAll(): Promise<Users[]> {
        return this.prisma.users.findMany({
            include:{
                UserTypes:true
            },
        });
    }
    async findById(id: number): Promise<Users> {
        return await this.prisma.users.findUnique({
            where: {
                id: id
            }
        })
    }
    async findByEmail(email : Prisma.UsersWhereUniqueInput) : Promise<any>{
        return await this.prisma.users.findUnique({
            include:{
                UserTypes:true
            },
            where: email
        })
    }
    async comparePassword(loginPassword:string , userPassword:string){
        return await bcrypt.compare(loginPassword,userPassword)
    }
    async createUser(createUserDto: CreateUserDto): Promise<Users> {
        const dataInsercao = new Date();
        dataInsercao.setHours(dataInsercao.getHours() - 3);

        const registred = await this.findByEmail({email: createUserDto.email})

        if(registred) throw new BadRequestException('O usuário já está registrado na base de dados.',);

        return this.prisma.users.create({
          data:{
            ...createUserDto,
            email: createUserDto.email.toLowerCase(),
            password: await bcrypt.hash(createUserDto.password,10),
            createdAt: dataInsercao,
            updatedAt: null,
          }
        });
    }
    async updateUserNotAdmin(updateUserDto:UpdateUserDto): Promise<Users> {
        const dataAtualizacao = new Date();
        dataAtualizacao.setHours(dataAtualizacao.getHours() - 3);
        return this.prisma.users.update({
            data: {
                email: updateUserDto.email.toLowerCase(),
                name: updateUserDto.name,
                updatedAt: dataAtualizacao
            },
            where:{
                id: updateUserDto.id
            },
        });
    }
    async updateUserAdmin(updateUserDto:UpdateUserDto): Promise<Users>{
        const dataAtualizacao = new Date();
        dataAtualizacao.setHours(dataAtualizacao.getHours() - 3);
        return this.prisma.users.update({
            data: {
                email: updateUserDto.email.toLowerCase(),
                name: updateUserDto.name,
                updatedAt: dataAtualizacao,
                type: updateUserDto.type
            },
            where:{
                id: updateUserDto.id
            },
        });
    }
    
    async deleteUser(id:number): Promise<Users> {
        const dataAtualizacao = new Date();
        dataAtualizacao.setHours(dataAtualizacao.getHours() - 3);
        return this.prisma.users.update({
            data:{
                deletedAt: dataAtualizacao,
                updatedAt: dataAtualizacao
            },
            where:{
                id: id
            }
        });
    }
}