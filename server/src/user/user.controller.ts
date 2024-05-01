import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { SignUp } from './dto/signup.dto';
import { Response } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(
        private UserServide : UserService
    ){}


// --- user signUp 
  @Post("/signup")
  async signUp(@Body() req : SignUp , @Res() res:Response){
       return await this.UserServide.SignUp(req,res)
  }





}
