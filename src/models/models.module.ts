import { Module } from '@nestjs/common';
import { ModelsService } from './models.service';
import { ModelsController } from './models.controller';
import { PrismaService } from '../prisma.service';
import { UsersService } from 'src/users/users.service';
@Module({
  controllers: [ModelsController],
  providers: [ModelsService,PrismaService,UsersService],
  exports: [ModelsService]
})
export class ModelsModule {}
