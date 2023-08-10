import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { TypeOrmConfigService } from './config/typeorm.config.service';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommentModule } from './comment/comment.module';
import { CardModule } from './card/card.module';
import { AuthMiddleware } from './auth/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
      inject: [ConfigService],
    }),
    BoardModule,
    UserModule,
    CommentModule,
    CardModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UserService,
    // AuthMiddleware
  ],
})
export class AppModule {
  // implements NestModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(AuthMiddleware)
  //     .forRoutes({
  //       path: 'board/member/:board_id',
  //       method: RequestMethod.POST,
  //     });
  // }
}
