import { Test, TestingModule } from '@nestjs/testing';
import { ModelsService } from './models.service';
import { PrismaService } from 'src/prisma.service';

describe('ModelsService', () => {
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
});
