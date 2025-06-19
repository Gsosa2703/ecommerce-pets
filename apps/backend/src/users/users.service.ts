import { Injectable } from '@nestjs/common';
import { User } from '@ecommerce-pets/shared/types/user';

const users = [
  {
   id: 1,
   name: 'John Doe',
   email: 'john.doe@example.com',
   password: '123456',
  },
  {
   id: 2,
   name: 'Jane Doe',
   email: 'jane.doe@example.com',
   password: '123456',
  },
]

@Injectable()
export class UsersService {
  async findUserByName(username:string): Promise<User> {
    return users.find(user => user.name === username) as User;
  }
}
