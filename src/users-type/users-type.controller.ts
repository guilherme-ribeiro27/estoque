import { Controller,Get,Req } from '@nestjs/common';
import { UsersTypeService } from './users-type.service';
import { ApiOperation, ApiTags,ApiOkResponse } from '@nestjs/swagger';
@Controller('users-type')
export class UsersTypeController {
  constructor(private readonly usersTypeService: UsersTypeService) {}

  @Get()
  async getAll(@Req() req){
    const user = req.user
    
  }
}
