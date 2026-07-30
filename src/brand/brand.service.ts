import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand, HBrandDocument } from 'src/DB/Models/brand.model';
import { CreateBrandDto } from './DTO/create-brand.dto';
import { UpdateBrandDto } from './DTO/update.brand.dto';
import { Category, HCategoryDocument } from 'src/DB/Models/category.model';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel(Brand.name)
    private readonly brandModel: Model<HBrandDocument>,
  
    @InjectModel(Category.name)
    private readonly categoryModel: Model<HCategoryDocument>
) {}

  
  private async validateCategoriesExists(categoriesIDs : string[]):Promise<void>{
    if( categoriesIDs.length === 0) return;

    const existingCategories = await this.categoryModel.countDocuments({
        _id :{$in: categoriesIDs}
    })

    if(existingCategories !== categoriesIDs.length){
        throw new BadRequestException(`One Or more assigned categories IDs not exists in DB`)

    }
}

  async create(dto: CreateBrandDto, logoUrl: string, adminId: string) {
    await this.validateCategoriesExists(dto.categories)
    const brand = await this.brandModel.findOne({
      name: this.brandModel.name,
    });

    if (brand) throw new ConflictException(`Category Already Exist`);

    const newBrand = new this.brandModel({
      ...dto,
      logo: logoUrl,
      createdBy: adminId,
    });

    return newBrand.save();
  }

  async update(
    dto: UpdateBrandDto,
    id: string,
    logoUrl?: string | undefined,
  
  )
  
  {
    if(dto.categories){
        await this.validateCategoriesExists(dto.categories)
    }
    const updatedPayload = { ...dto }; //destract el dto 34an a2dr amsk 7aga mo3ina

    if (logoUrl) updatedPayload.logo = logoUrl; //hna mskt el logourl

    const updated = await this.brandModel.findByIdAndUpdate(
      id,
      updatedPayload,
      { new: true }, // de lazem 34an b y update w yrg3ly el data el gdeda
    );

    if (!updated) throw new NotFoundException(`Category Document not found`);
    return updated;
  }

  async FindAll() {
    return this.brandModel
      .find()
      .populate('createdBy', 'firstName lastName email');
  }

  async findById(id: string) {
    const brand = await this.brandModel
      .findById(id)
      .populate('createdBy');
    if (!brand) throw new NotFoundException(`Category doesn't exist`);

    return brand;
  }
}
