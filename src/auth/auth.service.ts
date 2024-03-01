import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { AdminDto } from 'src/dto/admin.dto';

@Injectable()
export class AuthService {
    constructor( private readonly databaseService: DatabaseService ) {}

    async login(username: string, password: string) {
        return this.databaseService.admin.findFirst({
            where: {
                username,
                password,
            }
        })
    }

    async register(adminDto: AdminDto) {
        const admin = this.databaseService.admin.findFirst({
            where: {
                username: adminDto.username,
            }
        })

        if (admin) {
            return new BadRequestException(`Администратор с логином ${adminDto.username} уже существует`)
        }

        return this.databaseService.admin.create({
            data: adminDto,
        })
    }
}
