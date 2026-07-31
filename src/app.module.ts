import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join, resolve } from 'node:path';
import { AuthModule } from './Auth/Auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { MailModule } from './mail/mail.module';
import { LoggerMiddleware } from './common/Middlewares/logger.middleware';
import { AuthController } from './Auth/Auth.controller';
import { CategoryModule } from './category/category.module';
import { BrandModule } from './brand/brand.module';
import { ProductModule } from './product/product.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CartModule } from './cart/cart.module';
import { ReviewModule } from './review/review.module';
import { CouponModule } from './coupon/coupon.module';
import { OrderModule } from './order/order.module';
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),ConfigModule.forRoot({ 
    envFilePath: resolve('config/dev.env'),
    isGlobal: true }),
    MongooseModule.forRootAsync({
      imports :[ConfigModule],
      useFactory: async (configService : ConfigService ) => ({
        uri: configService.get<string>('DB_URI') ,
        onConnectionCreate : (connection : Connection)=>{
            connection.on("connected",()=>{
                console.log("MongoDB connected successfully");
            })
        }
      }),
      inject: [ConfigService]
    }),
      AuthModule,
      MailModule,
      CategoryModule,
      BrandModule,
      ProductModule,
      CartModule,
      ReviewModule,
      CouponModule,
      OrderModule,
      CacheModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(AuthController)
  }
}
