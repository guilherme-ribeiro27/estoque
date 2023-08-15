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
@Module({
  imports: [UsersModule, AuthModule, ConfigModule.forRoot({isGlobal:true}), ModelsModule],
  controllers: [AppController],
  providers: [AppService,JwtService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { "path" : "models", "method": RequestMethod.GET},
        { "path" : "models/ean/:ean", "method": RequestMethod.GET}
      )
      .forRoutes(ModelsController)
  }
}
