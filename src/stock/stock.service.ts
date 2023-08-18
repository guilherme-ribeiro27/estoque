import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Stock } from '@prisma/client';
import { UpdateStockDto } from './dto/update-stock.dto';
@Injectable()
export class StockService {
    constructor(private prisma: PrismaService) { }

    async getStockByEan(ean: number): Promise<Stock[]> {
        const model = await this.prisma.productModels.findUnique({
            where: {
                ean: Number(ean)
            }
        })
        const stock = await this.prisma.stock.findMany({
            include:{ProductModels:true},
            where:{
                productModelsId: model.id
            }
        })
        return stock
    }
    
    async stock(updateStockDto:UpdateStockDto,): Promise<Stock>{
        const stock = await this.prisma.stock.findUnique({
            where:{
                unique_stock:{
                    productModelsId: updateStockDto.modelId,
                    size: updateStockDto.size
                }
            }
        })       
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
                unique_stock:{
                    productModelsId: updateStockDto.modelId,
                    size: updateStockDto.size
                }
            }
        }) 
    }
    async removeStock(ean: number,size:number): Promise<Stock>{
        const model = await this.prisma.productModels.findUnique({
            where: {
                ean: Number(ean)
            }
        })
        return await this.prisma.stock.update({
            where:{
                unique_stock:{
                    productModelsId: model.id,
                    size: Number(size)
                }
            },
            data:{
                quantity:{
                    decrement: 1
                }
            }
        })
    }
    async getAllStock(): Promise<Stock[]> {
        return this.prisma.stock.findMany();
    }
}
