import { Req,Controller, Get, Param,Post,NotFoundException,Delete,Query,Put, Body } from '@nestjs/common';
import { StockService } from './stock.service';
import { Stock } from '@prisma/client';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateStockDto } from './dto/create-stock.dto';
import { ModelsService } from 'src/models/models.service';
import { UserTypes } from 'src/users-type/enums/user-types.enum';


@ApiTags('Stock')
@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService, private readonly modelsService:ModelsService) {}

  @ApiOperation({summary: 'Busca todo'})
  @ApiOkResponse({description: 'Modelos encontrados com sucesso',status:200,})
  @Get('all')
  async getAllStock(): Promise<Stock[]> {
    return this.stockService.getAllStock();
  }

  @ApiOperation({summary: 'Busca os tamanhos disponíveis no estoque pelo EAN'})
  @ApiOkResponse({description: 'Modelos encontrados com sucesso',status:200,})
  @Get('ean/:ean')
  async getStockByEan(@Param('ean') ean: number): Promise<Stock[]> {
    return this.stockService.getStockByEan(ean);
  }

  @ApiOperation({summary: 'Adiciona ou atualiza o estoque de um tamanho de um modelo'})
  @ApiOkResponse({description: 'Estoque cadastrado com sucesso',status:200,})
  @ApiBearerAuth('JWT')
  @Post('estocar')
  async createStock(@Req() req,@Body() createStockDto: CreateStockDto): Promise<string> {
    //validar se o usuário é do tipo 2  
    const user = req.user;
    if(user.userType !== UserTypes.ADMIN && user.userType !== UserTypes.ESTOQUISTA) throw new NotFoundException('Usuário não autorizado');
    //validar se o modelo já existe
    const model = await this.modelsService.getModelByEan(createStockDto.ean);
    
    if(!model) throw new NotFoundException('Modelo não encontrado');
    await this.stockService.stock({modelId:model.id, size:createStockDto.size});
    return 'Estoque cadastrado com sucesso'
  }

  @ApiOperation({summary: 'Diminui uma unidade do estoque de um tamanho de um modelo'})
  @ApiOkResponse({description: 'Estoque cadastrado com sucesso',status:200,})
  @ApiBearerAuth('JWT')
  @Put('updateAfterBuy/:ean/:size')
  async removeStock(@Query('ean') ean: number, @Query('size') size: number): Promise<string> {
    await this.stockService.removeStock(ean, size);
    return 'Estoque atualizado com sucesso'
  }
}
