import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/db/prisma.module';

@Module({
  providers: [ UserService],
  controllers: [UserController],
  imports : [PrismaModule]
})
export class UserModule {}
