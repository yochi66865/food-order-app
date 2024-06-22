import { Injectable } from '@nestjs/common';
import { DbService } from './db/db.service.ts';
import { OperatorStatement } from './db/query.statment.js';

@Injectable()
export class AppService {
  constructor(private readonly dbService: DbService) {}
  async getHello() {
    return this.dbService.query({
      table: 'users',
      columns: ['id', 'fname'],
      where: [
        { column: 'email', operator: OperatorStatement['='], value: 'ggg@ggg' },
      ],
    });
  }
}
