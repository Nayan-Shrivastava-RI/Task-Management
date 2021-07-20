import { Controller, Post, Body } from '@nestjs/common';
import { AuthCredentials } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('/signup')
    signUp(@Body() authCredentials: AuthCredentials): Promise<User>{
        return this.authService.signUp(authCredentials);
    }

    @Post('/signin')
    signIn(@Body() authCredentials: AuthCredentials): Promise<{accessToken: string}>{
        return this.authService.signIn(authCredentials);
    }
    
}
