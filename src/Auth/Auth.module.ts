import { Module } from "@nestjs/common";
import { AuthService } from "./Auth.service";
import { AuthController } from "./Auth.controller";
import { ConfigModule } from "@nestjs/config";
import { UserModel } from "src/DB/Models/user.model";
import { MailModule } from "src/mail/mail.module";


@Module({
    imports : [ConfigModule.forRoot({
        isGlobal : true,
        envFilePath : 'config/dev.env'
    }), UserModel , MailModule],
    controllers : [AuthController],
    providers : [AuthService]
})

export class AuthModule{}

