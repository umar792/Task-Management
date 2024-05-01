import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaSerice extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect().then(()=>{
            console.log("database connection established")
        }).catch((err)=>{
            console.log(`Error connecting ${ err.message }`)
        });
    }
}
