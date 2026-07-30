import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { UserModel } from 'src/DB/Models/user.model';
import { CategoryModel } from 'src/DB/Models/category.model';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/common/services/Token.service';
import { AuthGuard } from 'src/common/services/auth.guard';
import { CommonModule } from 'src/common/commonModule/common.module';

@Module({
  imports: [UserModel, CommonModule , CategoryModel],  
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
