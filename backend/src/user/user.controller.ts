import { Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'models';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  signIn(): User {
    return this.userService.signIn();
  }
}
