import { Module } from '@nestjs/common';
import { UsersTypeService } from './users-type.service';
import { UsersTypeController } from './users-type.controller';
import { PrismaService } from 'src/prisma.service';
@Module({
  controllers: [UsersTypeController],
  providers: [UsersTypeService,PrismaService],
})
export class UsersTypeModule {}
