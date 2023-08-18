import { Controller,Get,Req,BadRequestException } from '@nestjs/common';
import { UsersTypeService } from './users-type.service';
import { ApiOperation, ApiTags,ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserTypes } from './enums/user-types.enum';
import { UserTypes as Types } from '@prisma/client';
@ApiTags('UsersType')
@Controller('UsersType')
export class UsersTypeController {
  constructor(private readonly usersTypeService: UsersTypeService) {}
  @ApiOperation({summary:'Retorna todos os usuários'})
  @ApiBearerAuth('JWT')
  @Get()
  async getAll(@Req() req):Promise<Types[]>{
    const user = req.user
    if(user.userType !== UserTypes.ADMIN) throw new BadRequestException('You are not allowed to do this action')
    return await this.usersTypeService.getAllUsersType()
  }
}
