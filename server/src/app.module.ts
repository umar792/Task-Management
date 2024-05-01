import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal : true,
      envFilePath : ".env"
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.SMPT_HOST,
        port: parseInt(process.env.SMPT_PORT),
        secure : true,
        auth: {
          user: process.env.SMPT_ADMIN_EMAIL,
          pass:process.env.SMPT_ADMIN_PASSWORD
        }
      }
    }),
    UserModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
