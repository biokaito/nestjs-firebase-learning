import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from '../models/auth-credentials.model';
import { GetUser } from './dto/get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentials: AuthCredentialsDto): Promise<string> {
    return this.authService.signUp(authCredentials);
  }

  @Post('/signin')
  signIn(
    @Body() authCredentials: any,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentials);
  }

  @Post('/user/signup')
  userSignUp(@Body() authCredentials: AuthCredentialsDto): Promise<string> {
    return this.authService.userSignUp(authCredentials);
  }

  @Post('/user/signin')
  userSignIn(
    @Body() authCredentials: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.userSignIn(authCredentials);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req, @GetUser() user: AuthCredentialsDto) {
    console.log('user: ', user.username);
  }
}
