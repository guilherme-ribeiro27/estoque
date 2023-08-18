import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { Prisma, ProductModels } from '@prisma/client';

@Injectable()
export class ModelsService {
    constructor(private prisma: PrismaService) { }

    async createModel(createModelDto : CreateModelDto, userId:number):Promise<ProductModels>{
        try {
            return await this.prisma.productModels.create({
                data: {
                    ean: createModelDto.ean,
                    price: createModelDto.price,
                    description: createModelDto.description,
                    usersId  : userId,
                }
            })
        } catch (error) {
        if( error instanceof Prisma.PrismaClientKnownRequestError){
            if(error.code === 'P2002') throw new BadRequestException('Modelo já cadastrado')
        }
    }
    }

    async getAllModels(){
        return await this.prisma.productModels.findMany();
    }

    async getModelById(id: number){
        return await this.prisma.productModels.findUnique({
            where: {
                id: id
            }
        })
    }

    async getModelByEan(ean: number){
        return await this.prisma.productModels.findUnique({
            where: {
                ean: ean
            }
        })
    }

    async updateModel(updateModelDto: UpdateModelDto, userId:number){
        try {
            const dataAtualizacao = new Date();
            dataAtualizacao.setHours(dataAtualizacao.getHours() - 3);
            return await this.prisma.productModels.update({
                where: {
                    id: updateModelDto.id
                },
                data: {
                    ean: updateModelDto.ean,
                    price: updateModelDto.price,
                    description: updateModelDto.description,
                    usersId  : userId,
                    updatedAt: dataAtualizacao
                }
            })
        } catch (error) {
            if( error instanceof Prisma.PrismaClientKnownRequestError){
                if(error.code === 'P2002') throw new BadRequestException('Modelo já cadastrado')
            }
        }
    }

    async deleteModel(id: number){
        return await this.prisma.productModels.delete({
            where: {
                id: id
            }
        })
    }
}
