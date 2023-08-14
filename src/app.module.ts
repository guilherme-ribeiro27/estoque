import { MiddlewareConsumer, Module , NestModule} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ModelsModule } from './models/models.module';
import { AuthMiddleware } from './common/middlewares/auth-middleware';
import { ModelsController } from './models/models.controller';
@Module({
  imports: [UsersModule, AuthModule, ConfigModule.forRoot({isGlobal:true}), ModelsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(ModelsController)
  }
}
