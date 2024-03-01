import { Body, Controller, Get, Param, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { AdminDto } from 'src/dto/admin.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor( private readonly authService: AuthService ) {}

    @Get('login')
    async login(@Query() loginQuery: { username: string, password: string }) {
        return this.authService.login(loginQuery.username, loginQuery.password)
    }

    @UsePipes(new ValidationPipe())
    @Post('register')
    async registerNewAdmin(@Body() adminDto: AdminDto) {
        return this.authService.register(adminDto)
    }
}
