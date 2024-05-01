import { Module } from '@nestjs/common';
import { PrismaSerice } from './prisma.service';

@Module({
  providers: [PrismaSerice],
  exports : [PrismaSerice]
})
export class PrismaModule {}
