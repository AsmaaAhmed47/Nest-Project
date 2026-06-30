import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { SantizeUsernamePipe } from "./pipes/santize-username.pipe";
import { CreateUserDto } from "./DTO/createUserDto";


@Controller("auth")
// @UsePipes(new SantizeUsernamePipe())
export class AuthController{


    @Post("register")
    register(@Body(new ValidationPipe ) createUserDto: CreateUserDto){
      return { status :"Success" , data : createUserDto}
    }
 

    //ParseIntPipe 
     @Get("/:id")
     getId(@Param("id" , ParseIntPipe ) id : number ){
      return { userId : id , type : typeof id}
     }

     // custom pipe to santize the username
     @Get()
     getusername(@Query("username" , SantizeUsernamePipe) username : string){
      return { SerchedUser : username }
     }
   }

