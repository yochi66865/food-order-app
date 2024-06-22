import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginUser, User } from 'models';
import { DbService } from '../db/db.service.ts';
import { OperatorStatement } from '../db/query.statment.js';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DbService) {}
  signIn(userLogin: LoginUser): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.dbService
        .query({
          table: 'users',
          columns: ['*'],
          where: [
            {
              column: 'email',
              operator: OperatorStatement['='],
              value: userLogin.email,
            },
            {
              column: 'password',
              operator: OperatorStatement['='],
              value: userLogin.password,
            },
          ],
        })
        .catch((err) => {
          reject(new BadRequestException(err));
        })
        .then((res) => {
          if (res[0]?.id) {
            resolve(res[0]);
          } else {
            reject(new NotFoundException('user is not exists, please sign up'));
          }
        });
    });
  }
}
