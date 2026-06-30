import { Module } from "@nestjs/common";
import { AuthService } from "./Auth.service";
import { AuthController } from "./Auth.controller";
import { ConfigModule } from "@nestjs/config";


@Module({
    imports : [ConfigModule.forRoot({
        isGlobal : true,
        envFilePath : 'config/dev.env'
    })],
    controllers : [AuthController],
    providers : [AuthService]
})

export class AuthModule{}

