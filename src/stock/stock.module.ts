import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { PrismaService } from 'src/prisma.service';
import { ModelsService } from 'src/models/models.service';
@Module({
  controllers: [StockController],
  providers: [StockService,PrismaService,ModelsService],
})
export class StockModule {}
