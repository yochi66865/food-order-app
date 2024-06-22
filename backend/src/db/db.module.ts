import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KnexModule } from 'nest-knexjs';
import { DbService } from './db.service.ts';

@Module({
  imports: [
    KnexModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const dbConfig = configService.get('database');
        return {
          config: {
            client: 'pg',
            connection: {
              host: dbConfig.host,
              port: dbConfig.port,
              user: dbConfig.userName,
              password: dbConfig.password,
              database: dbConfig.dbName,
            },
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [DbService],
})
export class DbModule {}
