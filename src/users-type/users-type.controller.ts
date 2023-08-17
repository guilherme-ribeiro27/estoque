import { Controller,Get,Req,BadRequestException } from '@nestjs/common';
import { UsersTypeService } from './users-type.service';
import { ApiOperation, ApiTags,ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserTypes } from './enums/user-types.enum';

@ApiTags('UsersType')
@Controller('users-type')
export class UsersTypeController {
  constructor(private readonly usersTypeService: UsersTypeService) {}

  @ApiBearerAuth('JWT')
  @Get()
  async getAll(@Req() req){
    const user = req.user
    if(user.userType !== UserTypes.ADMIN) throw new BadRequestException('You are not allowed to do this action')
    return await this.usersTypeService.getAllUsersType()
  }
}
