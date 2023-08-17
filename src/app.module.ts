import { MiddlewareConsumer, Module , NestModule, RequestMethod} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ModelsModule } from './models/models.module';
import { AuthMiddleware } from './common/middlewares/auth-middleware';
import { ModelsController } from './models/models.controller';
import { JwtService } from '@nestjs/jwt';
import { StockModule } from './stock/stock.module';
import { StockController } from './stock/stock.controller';
import { UsersTypeModule } from './users-type/users-type.module';
import { UsersTypeController } from './users-type/users-type.controller';
import { UsersController } from './users/users.controller';
@Module({
  imports: [UsersModule, AuthModule, ConfigModule.forRoot({isGlobal:true}), ModelsModule, StockModule, UsersTypeModule],
  controllers: [AppController],
  providers: [AppService,JwtService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { "path" : "models", "method": RequestMethod.GET},
        { "path" : "models/ean/:ean", "method": RequestMethod.GET},
        { "path" : "stock/ean/:ean", "method": RequestMethod.GET},
        { "path" : "stock/all", "method": RequestMethod.GET},
      )
      .forRoutes(ModelsController,StockController,UsersController,UsersTypeController)
  }
}
