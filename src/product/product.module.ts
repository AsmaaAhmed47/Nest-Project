import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { UserModel } from 'src/DB/Models/user.model';
import { BrandModel } from 'src/DB/Models/brand.model';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/common/services/Token.service';
import { ProductModel } from 'src/DB/Models/product.model';
import { CategoryModel } from 'src/DB/Models/category.model';

@Module({
  imports:[ProductModel, UserModel , CategoryModel , BrandModel],
  controllers: [ProductController],
  providers: [ProductService , JwtService , TokenService],
})
export class ProductModule {}
