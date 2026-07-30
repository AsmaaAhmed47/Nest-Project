import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { UserModel } from 'src/DB/Models/user.model';
import { ReviewModel } from 'src/DB/Models/review.model';
import { ProductModel } from 'src/DB/Models/product.model';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/common/services/Token.service';

@Module({
  imports:[UserModel , ReviewModel , ProductModel],
  controllers: [ReviewController],
  providers: [ReviewService , JwtService , TokenService],
})
export class ReviewModule {}
