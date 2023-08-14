import { Controller } from '@nestjs/common';
import { ModelsService } from './models.service';
import {Get, Post, Put, Delete, Body, BadRequestException} from  '@nestjs/common';
import { ApiOperation, ApiTags,ApiOkResponse } from '@nestjs/swagger';
import { CreateModelDto } from './dto/create-model.dto';
import { UsersService } from 'src/users/users.service';
import { ProductModels } from '@prisma/client';
@ApiTags('Models')
@Controller('models')
export class ModelsController {
  constructor(private readonly modelsService: ModelsService, private usersService:UsersService) {}

  @ApiOperation({
    summary: 'Cria um modelo'
  })
  @ApiOkResponse({
    description: 'Modelo cadastrado com sucesso',
    status:200,
  })

  @Post('criar')
  async create(@Body() createModelDto: CreateModelDto):Promise<ProductModels> {
    //validar se o usuário é do tipo 1 ou 2
    const user = await this.usersService.findById(createModelDto.Users);
    if(user.type != 1 && user.type != 2) 
      throw new BadRequestException('O usuário não tem permissão para criar um modelo.')
    return await this.modelsService.createModel(createModelDto);
  }
}
