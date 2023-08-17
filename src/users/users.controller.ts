import { Controller ,Post,Body, Req,Put,BadRequestException,Delete,Get} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiTags,ApiOkResponse, ApiBasicAuth, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { Users, Prisma} from '@prisma/client';
import { UserTypes } from 'src/users-type/enums/user-types.enum';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({summary:'Retorna todos os usuários'})
  @ApiOkResponse({description:'Usuários retornados com sucesso',status:200})
  @ApiBearerAuth('JWT')
  @Get()
  async findAll(@Req() req): Promise<Users[]> {
    //validar o tipo de usuario
    const user = req.user;
    if(user.userType !== UserTypes.ADMIN) throw new BadRequestException('Você não tem permissão para realizar essa ação');
    return await this.usersService.findAll();
  }

  @ApiOperation({summary: 'Cria um usuário'})
  @ApiOkResponse({description: 'Usuário cadastrado com sucesso',status:200,})
  @Post('registro')
  async create(@Req() req,@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @ApiOperation({summary:'Atualiza um usuário'})
  @ApiOkResponse({description:'Usuário atualizado com sucesso',status:200})
  @ApiBearerAuth('JWT')
  @Put()
  async update(@Req() req,@Body() updateUserDto: UpdateUserDto) {
    //validar o tipo de usuario
    const user = req.user;
    if(user.userType !== UserTypes.ADMIN){
      return await this.usersService.updateUserNotAdmin(updateUserDto)
    }else{
      return await this.usersService.updateUserAdmin(updateUserDto);
    }
  }

  @ApiOperation({summary:'Remove um usuário'})
  @ApiOkResponse({description:'Usuário removido com sucesso',status:200})
  @ApiBearerAuth('JWT')
  @ApiParam({name:'id',type:'number'})
  @Delete(':id')
  async delete(@Req() req) : Promise<Users>{
    //validar o tipo de usuario
    const user = req.user;
    if(user.userType !== UserTypes.ADMIN) throw new BadRequestException('Você não tem permissão para realizar essa ação');
    return await this.usersService.deleteUser(Number(req.params.id));
  }
}
