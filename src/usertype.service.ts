import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserTypes, Prisma } from '@prisma/client';

@Injectable()

export class UserTypesService {
    constructor(private prisma: PrismaService) { }

    async userTypes(params:{
        skip?: number;
        take?: number;
        cursor?: Prisma.UserTypesWhereUniqueInput;
        where?: Prisma.UserTypesWhereInput;
        orderBy?: Prisma.UserTypesOrderByWithRelationInput;
    }) : Promise<UserTypes[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.userTypes.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }
}