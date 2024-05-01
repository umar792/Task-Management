import { IsDate, IsEmail, IsNotEmpty, IsString } from "class-validator";



export class SignUp {

    @IsNotEmpty()
    @IsString()
    username : string

    @IsNotEmpty()
    @IsEmail()
    email : string

    @IsNotEmpty()
    @IsString()
    password : string

 


}