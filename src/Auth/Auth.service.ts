import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './DTO/createUserDto';
import { HUserDocument, User, UserModel } from 'src/DB/Models/user.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MailService } from 'src/mail/mail.service';
import { hash } from 'src/common/Security/hash.security';
import { ConfirmEmailDto } from './DTO/confirm-emailDto';
import { compare } from 'src/common/Security/hash.security';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<HUserDocument>,
    private readonly mailService: MailService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (existingUser) {
      throw new ConflictException(' User with this email already exists');
    }

    // generate otp
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await hash(otp);

    const expierdTime = new Date();
    expierdTime.setMinutes(expierdTime.getMinutes() + 5);

    const newUser = new this.userModel({
      ...createUserDto,
      confirmEmailOTP: hashedOtp,
      OTPExpires: expierdTime,
    });

    const savedUser = await newUser.save();
    this.mailService.sendVervicationOtp(savedUser.email, otp);
    return savedUser;
  }

  async confirmEmail(confirmEmailDto: ConfirmEmailDto) {
    const user = await this.userModel.findOne({ email: confirmEmailDto.email });

    if (!user) {
      throw new NotFoundException('User with this email not found');
    }

    if (user.confirmEmail) {
      throw new BadRequestException('Email already confirmed');
    }

    if (
      !user.confirmEmailOTP ||
      !(await compare(confirmEmailDto.confirmEmailOTP, user.confirmEmailOTP))
    ) {
      throw new BadRequestException('Invalid confirmation code');
    }

    if (new Date() > user.OTPExpires!) {
      throw new BadRequestException(
        'Confirmation code expired , please request a new one',
      );
    }

    user.confirmEmail = new Date();
    user.confirmEmailOTP = undefined;
  }

  async updateProfilePic(filePath: string, userId: string) {
    const publicUrl = `http://localhost:3000/${filePath.replace(/\\/g, '/')}`;
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      { profilePic: publicUrl },
      { new: true },
    );

    if (!updatedUser) throw new NotFoundException(`User Account Not Found`);

    return updatedUser;
  }
}
