import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { resolve } from 'node:path';
import { AuthModule } from './Auth/Auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { MailModule } from './mail/mail.module';
import { LoggerMiddleware } from './common/Middlewares/logger.middleware';
import { AuthController } from './Auth/Auth.controller';

@Module({
  imports: [ConfigModule.forRoot({ 
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
      MailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(AuthController)
  }
}
