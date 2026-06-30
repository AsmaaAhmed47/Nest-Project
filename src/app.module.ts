import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'node:path';
import { AuthModule } from './Auth/Auth.module';
import { UserModule } from './user/user.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [ConfigModule.forRoot({ 
    envFilePath: resolve('config/dev.env'),
    isGlobal: true }),
      AuthModule,
      UserModule,
      CommentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
