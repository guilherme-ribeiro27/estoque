import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';

@Injectable()
export class ModelsService {
    constructor(private prisma: PrismaService) { }

    async createModel(createModelDto : CreateModelDto){
        return await this.prisma.productModels.create({
            data: {
                ean: createModelDto.ean,
                price: createModelDto.price,
                description: createModelDto.description,
                usersId  : createModelDto.Users,
            }
        })
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

    async updateModel(updateModelDto: UpdateModelDto){
        return await this.prisma.productModels.update({
            where: {
                id: updateModelDto.id
            },
            data: {
                ean: updateModelDto.ean,
                price: updateModelDto.price,
                description: updateModelDto.description,
                usersId  : updateModelDto.Users,
            }
        })
    }

    async deleteModel(id: number){
        return await this.prisma.productModels.delete({
            where: {
                id: id
            }
        })
    }
}
