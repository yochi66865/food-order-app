import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DbService } from '../db/db.service.ts';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, DbService],
})
export class UserModule {}
