import { Controller, HttpCode, HttpStatus, NotImplementedException, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {

 @HttpCode(HttpStatus.OK)
 @Post('login')
 async login(@Body() input: AuthInput) {
  throw new NotImplementedException('This method is not implemented') 
 }
}
