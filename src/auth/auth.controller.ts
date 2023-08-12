import { Controller, Post,Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthUserResponseDto } from './dto/auth-user-response.dto';
import { AuthUserDto } from './dto/auth-user.dto';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Realiza a auntenticação de um usuário',
    description: 'Retorna um token referente a autenticação de um usuário',
  })
  @ApiOkResponse({
    description: 'Retorna o token de autenticação de um usuário',
    type: AuthUserResponseDto,
  })
  @Post('login')
  async login(@Body() authUserDto: AuthUserDto):Promise<AuthUserResponseDto>{
    return this.authService.login(authUserDto);
  }
}
