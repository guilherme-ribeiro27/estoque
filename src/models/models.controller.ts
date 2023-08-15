import { ModelsService } from './models.service';
import {Get, Post, Put, Delete, Body, BadRequestException,Controller, Req } from  '@nestjs/common';
import { ApiOperation, ApiTags,ApiOkResponse,ApiBearerAuth,ApiParam } from '@nestjs/swagger';
import { CreateModelDto } from './dto/create-model.dto';
import { UsersService } from 'src/users/users.service';
import { ProductModels } from '@prisma/client';
import { Request } from 'express';
import { UpdateModelDto } from './dto/update-model.dto';

@ApiTags('Models')
@Controller('models')
export class ModelsController {
  constructor(private readonly modelsService: ModelsService, private usersService:UsersService) {}

  
  @ApiOperation({summary: 'Busca todos os modelos'})
  @ApiOkResponse({description: 'Modelos encontrados com sucesso',status:200,})
  @Get()
  async findAll():Promise<ProductModels[]> {
    return await this.modelsService.getAllModels();
  }

  @ApiOperation({summary: 'Busca um modelo pelo EAN'})
  @ApiOkResponse({description: 'Modelo encontrado com sucesso',status:200,})
  @ApiParam({name: 'ean', type: 'number'})
  @Get('ean/:ean')
  async findByEan(@Req() req):Promise<ProductModels> {
    return await this.modelsService.getModelByEan(Number(req.params.ean));
  }

  @ApiOperation({
    summary: 'Cria um modelo'
  })
  @ApiOkResponse({
    description: 'Modelo cadastrado com sucesso',
    status:200,
  })
  @ApiBearerAuth('JWT')
  @Post('criar')
  async create(@Req() req,@Body() createModelDto: CreateModelDto,):Promise<ProductModels> {
    //validar se o usuário é do tipo 1 ou 2
    const user = req.user;
    if(user.userType != 1 && user.userType != 2) 
      throw new BadRequestException('O usuário não tem permissão para criar um modelo.')
    return await this.modelsService.createModel(createModelDto, user.id);
  }

  @ApiOperation({
    summary: 'Atualiza um modelo'
  })
  @ApiOkResponse({
    description: 'Modelo atualizado com sucesso',
    status:200,
  })
  @ApiBearerAuth('JWT')
  @Put('atualizar')
  async update(@Req() req,@Body() updateModelDto: UpdateModelDto,):Promise<ProductModels> {
    //validar se o usuário é do tipo 1 ou 2
    const user = req.user;
    if(user.userType != 1 && user.userType != 2) 
      throw new BadRequestException('O usuário não tem permissão para atualizar um modelo.')
    return await this.modelsService.updateModel(updateModelDto, user.id);
  }

  @ApiOperation({
    summary: 'Deleta um modelo'
  })
  @ApiOkResponse({
    description: 'Modelo deletado com sucesso',
    status:200,
  })
  @ApiParam({name: 'id', type: 'number'})
  @ApiBearerAuth('JWT')
  @Delete('deletar/:id')
  async delete(@Req() req):Promise<ProductModels> {
    //validar se o usuário é do tipo 1 ou 2
    const user = req.user;
    if(user.userType != 1 && user.userType != 2) 
      throw new BadRequestException('O usuário não tem permissão para deletar um modelo.')
    return await this.modelsService.deleteModel(Number(req.params.id));
  }

  @ApiOperation({
    summary: 'Busca um modelo pelo ID'
  })
  @ApiOkResponse({
    description: 'Modelo encontrado com sucesso',
    status:200,
  })
  @ApiParam({name: 'id', type: 'number'})
  @Get('id/:id')
  async findById(@Req() req):Promise<ProductModels> {
    return await this.modelsService.getModelById(Number(req.params.id));
  }
}
