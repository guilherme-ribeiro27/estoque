import { Controller ,Post,Body} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiTags,ApiCreatedResponse,ApiOkResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { Users, Prisma} from '@prisma/client';
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: 'Cria um usuário'
  })
  @ApiOkResponse({
    description: 'Usuário cadastrado com sucesso',
    status:200,
  })
  @Post('registro')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }
}
