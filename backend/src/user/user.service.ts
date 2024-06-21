import { Injectable } from '@nestjs/common';
import { User } from 'models';

@Injectable()
export class UserService {
  signIn(): User {
    console.log();

    return {
      id: '1',
      fname: 'John',
      lname: 'Doe',
      email: '<EMAIL>',
      password: '<PASSWORD>',
      tel: '0123456789',
      address: {
        street: '123 Fake Street',
        city: 'London',
        country: 'UK',
        numHouse: 123,
        remarks: 'No remarks',
      },
    };
  }
}
