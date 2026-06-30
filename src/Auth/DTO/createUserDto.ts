import { IsEmail, IsInt, IsOptional, IsPhoneNumber, IsString, Length, Max, Min } from "class-validator"


export class CreateUserDto {
    @IsString()
    @Length(3, 20, { message: "username must be between 3 and 20 characters" })
    username? : string
    
    @IsInt()
    @Min(18)
    @Max(100)
    age?:number

    @IsEmail({} ,{message : "email must be a valid email address"})
    email?:string

    @IsString()
    @IsOptional()
    @IsPhoneNumber("EG" , {message : "phone number must be a valid phone number"})
    phone?:string

    @IsString()
    @IsOptional()
    bio?:string
 
    @IsString({ each: true })
    @IsOptional()
    skills?:string[]
}