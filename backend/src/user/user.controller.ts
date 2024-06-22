import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUser, User } from 'models';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signIn')
  signIn(@Body() loginUser: LoginUser): Promise<User> {
    return this.userService.signIn(loginUser);
  }
}
