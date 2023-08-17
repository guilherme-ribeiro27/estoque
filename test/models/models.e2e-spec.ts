import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ModelsModule} from '../../src/models/models.module';
import { ModelsService } from '../../src/models/models.service';
import { PrismaService } from 'src/prisma.service';

describe('ModelsServices',()=>{
    let prismaService:PrismaService;
    let modelsService:ModelsService;

    beforeEach(()=>{
        prismaService = new PrismaService();
        modelsService = new ModelsService(prismaService);
    })

    it('should create a model successfully',async ()=>{
        const model ={
            ean: 78920230810,
            price: 150,
            description: 'Modelo de teste (jest)',
            userId: 1
        }
        const createdModel = await modelsService.createModel(model,1);

        expect(createdModel).toHaveProperty('id');
    })
})

