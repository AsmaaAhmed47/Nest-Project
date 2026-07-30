import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, HydrateOptions, Mongoose } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Coupon {
  @Prop({
    type: String,
    required: true,
    unique: true,
    trim: true,
    toUpperCase: true,
  })
  code!: string;

  @Prop({
    type: Number,
    required: true,
    min: 1,
    max: 100,
  })
  discount!: number;

  @Prop({
    type: Date,
    required: true,
  })
  expiredDate!: Date;

  @Prop({
    type: Number,
    required: true,
    min: 1,
  })
  maxUsage!: number;

    @Prop({
    type: Number,
    min: 0,
  })
  usedCound!: number;

  @Prop({
    type :[mongoose.Schema.Types.ObjectId],
    ref:'User',
    default:[]
  })
  usedBy! :string[]

  @Prop({
    type :mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  })
  createdBy! :string
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);
export type HCouponDocument = HydratedDocument<Coupon>;
export const CouponModel = MongooseModule.forFeature([
  {
    name: Coupon.name,
    schema: CouponSchema,
  },
]);
