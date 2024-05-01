import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaSerice } from 'src/db/prisma.service';
import * as bcrypt from "bcrypt";
import { SignUp } from './dto/signup.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UserService {

    constructor(
        private Prisma: PrismaSerice,
        private SendMailService: MailerService
    ) { }


    // ---- signUp user 
    async SignUp(req: SignUp, res: Response) {
        try {
            const { username, email, password } = req;
            if (!username) {
                return res.status(400).json({
                    success: false,
                    message: "username is required"
                })
            }
            if (!email) {
                return res.status(400).json({
                    success: false,
                    message: "email is required"
                })
            }
            if (!password) {
                return res.status(400).json({
                    success: false,
                    message: "password is required"
                })
            }

            // --- now check is user already in db 
            const isUser = await this.Prisma.user.findFirst({
                where: {
                    email: email
                }
            });

            // -- if exist user
            if (isUser) {
                return res.status(400).json({
                    success: false,
                    message: "user already exist"
                })
            }

            // --- if not 
            // 1=> hash the password 
            const hashPassword = await bcrypt.hash(password, 10);
            const OTP = Math.floor(1000 + Math.random() * 9000);
            const OTPexpiretime = new Date(Date.now() + 5 * 60 * 1000);

    //  -send mail to the user 
    try {
        await this.SendMailService.sendMail({
            from:  process.env.SMPT_ADMIN_EMAIL,
            to: email,
            subject: "OTP",
            text: `Hello ${username} Your OTP is ${OTP}`
        });

        // ---- create the user 
        const user = await this.Prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashPassword,
                // @ts-ignore
                OTP: OTP,
                OTPexpiretime 
            }
        });

        res.status(200).json({
            success: true,
            message: "OTP send to email please verify",
            user: user
        })
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        })
    }

            



        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            })
        }
    }

}
