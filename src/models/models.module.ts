import { Module } from '@nestjs/common';
import { ModelsService } from './models.service';
import { ModelsController } from './models.controller';
import { PrismaService } from '../prisma.service';
@Module({
  controllers: [ModelsController],
  providers: [ModelsService,PrismaService],
})
export class ModelsModule {}
