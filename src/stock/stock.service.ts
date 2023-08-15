import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Stock } from '@prisma/client';
import { UpdateStockDto } from './dto/update-stock.dto';
@Injectable()
export class StockService {
    constructor(private prisma: PrismaService) { }

    async getStockByEan(ean: number): Promise<Stock[]> {
        return this.prisma.$queryRaw`
        SELECT * FROM "Stock" WHERE 
        productModelsId = (SELECT id FROM "ProductModels" WHERE ean = ${ean})
        `
    }
    
    async stock(updateStockDto:UpdateStockDto,): Promise<Stock>{
        return await this.prisma.stock.upsert({
            create:{
                productModelsId: updateStockDto.modelId,
                size: updateStockDto.size,
                quantity: 1

            },
            update:{
                quantity: {
                    increment: 1
                }
            },
            where:{
                productModelsId: updateStockDto.modelId,
                size: updateStockDto.size
            }
        })
    }
    async removeStock(ean: number,size:number): Promise<Stock>{
        return await this.prisma.$queryRaw
        `
            UPDATE "Stock" SET quantity = quantity - 1 WHERE 
            productModelsId = (SELECT id FROM "ProductModels" WHERE ean = ${ean})
            AND size = ${size}
        `
    }
    async getAllStock(): Promise<Stock[]> {
        return this.prisma.stock.findMany();
    }
}
