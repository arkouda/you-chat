import { Controller, Post, Body, Query, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';

type WebToken = { token: string }

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() user: User): Promise<any> {
        return this.authService.login(user);
    }

    @Post('register')
    async register(@Body() user: User): Promise<any> {
        return this.authService.register(user);
    }

    @Get('confirm')
    async confirm(@Query() webToken: WebToken): Promise<any> {
        return this.authService.confirm(webToken.token);
    }
}
