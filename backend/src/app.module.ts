import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../assets/config/configuration';
import { DbService } from './db/db.service.ts';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    DbModule,
  ],
  controllers: [AppController],
  providers: [AppService, DbService],
})
export class AppModule {}
