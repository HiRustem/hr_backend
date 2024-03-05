import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { UserDto } from '../dto/create.dto';

@Injectable()
export class UsersService {
    constructor( private readonly databaseService: DatabaseService ) {}

    async getAllUsersCount() {
        return await this.databaseService.user.count()
    }
    
    async createUser(userDto: UserDto) {
        return await this.databaseService.user.create({
          data: userDto,
        })
    }
    
    async deleteUser(userId: number) {
        return await this.databaseService.user.delete({
          where: {
            id: userId,
          }
        })
    }
    
    async getUserById(userId: number) {
        return await this.databaseService.user.findUnique({
          where: {
            id: userId,
          }
        })
    }
}
