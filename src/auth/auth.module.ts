import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/auth-user.jwt.strategy';
@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService)=>{
        const secret = configService.get<string>('JWT_SECRET')
        const expriresIn = configService.get<string>('JWT_EXPIRESIN')

        if(!secret) throw new Error('A chave de criptografia não foi definida')

        return {
          secret,
          signOptions:{ expiresIn:  expriresIn || '1d' }
        }
      },
      inject: [ConfigService]
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,UsersService,JwtStrategy,PrismaService],
})
export class AuthModule {}
