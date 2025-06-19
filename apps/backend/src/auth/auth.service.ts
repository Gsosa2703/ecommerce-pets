import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Login as AuthInput } from '@ecommerce-pets/shared/types/auth/login';
import { Signin as SignInData } from '@ecommerce-pets/shared/types/auth/signin';
import { UsersService } from 'src/users/users.service';
import { AuthResult } from '@ecommerce-pets/shared/types/auth/auth_result';

@Injectable()
export class AuthService {
 constructor(private readonly usersService: UsersService) {}


 async authenticate(input: AuthInput): Promise<AuthResult> {
  const user = await this.validateUser(input);
  if (!user) {
    throw new UnauthorizedException('Invalid credentials');
  }
  return {
    accessToken: '123456',
    user: {
      id: user.userId,
      name: user.username,
    }
  };
 }

 async validateUser(input: AuthInput): Promise<SignInData | null> {
  const user = await this.usersService.findUserByName(input.username);
  if (user && user.password === input.password) {
    return {
      userId: user.id.toString(),
      username: user.name,
    };
  }
  return null
 }
}
