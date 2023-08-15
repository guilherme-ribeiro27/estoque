import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserTypes } from '@prisma/client';
@Injectable()
export class UsersTypeService {
    constructor(private readonly prismaService:PrismaService) {}

    async getAllUsersType() : Promise<UserTypes[]>{
        return await this.prismaService.userTypes.findMany();
    }
}
