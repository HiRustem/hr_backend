import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from 'src/dto/create.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('get/:id')
    async getHello(@Param('id', ParseIntPipe) userId: number) {
        return this.usersService.getUserById(userId);
    }

    @Get('getAllCount')
    async getAllUsers() {
        return this.usersService.getAllUsersCount()
    }
    
    @UsePipes(new ValidationPipe())
    @Post('create')
    async createUser(@Body() userDto: UserDto) {
        return this.usersService.createUser(userDto)
    }

    @Delete('delete/:id')
    async deleteUser(@Param('id', ParseIntPipe) userId: number) {
        return this.usersService.deleteUser(userId)
    }
}
