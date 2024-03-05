import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { AdminDto } from '../dto/admin.dto';
import { AuthService } from './auth.service';
import { LoginDto } from '../dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor( private readonly authService: AuthService ) {}

    @Get('all')
    async getAll() {
        return await this.authService.getAll()
    }

    @Get('login')
    async login(@Query() loginQuery: LoginDto) {
        return await this.authService.login(loginQuery)
    }

    @UsePipes(new ValidationPipe())
    @Post('register')
    async registerNewAdmin(@Body() adminDto: AdminDto) {
        return await this.authService.register(adminDto)
    }

    @Delete('delete/:id')
    async deleteAdminById(@Param('id', ParseIntPipe) adminId: number) {
        return await this.authService.deleteById(adminId)
    }
}
