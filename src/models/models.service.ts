import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateModelDto } from './dto/create-model.dto';

@Injectable()
export class ModelsService {
    constructor(private prisma: PrismaService) { }

    async createModel(createModelDto : CreateModelDto){
        return await this.prisma.productModels.create({
            data: {
                ean: createModelDto.ean,
                price: createModelDto.price,
                description: createModelDto.description,

            }
        })
    }
}
