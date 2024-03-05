import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { AdminDto } from '../dto/admin.dto';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
    constructor( private readonly databaseService: DatabaseService ) {}

    async login(loginQuery: LoginDto) {
        return await this.databaseService.admin.findFirstOrThrow({
            where: {
                AND: [
                    {username: loginQuery.username},
                    {password: loginQuery.password}
                ]
            }
        })
        .then(() => {
            return {
                status: true,
                username: loginQuery.username,
            }
        })
        .catch(() => {
            return new BadRequestException('Неверный логин или пароль')
        })
        

    }

    async register(adminDto: AdminDto) {
        return await this.databaseService.admin.findUniqueOrThrow({
            where: {
                username: adminDto.username,
            }
        })
        .then(() => {
            return new BadRequestException(`Администратор с логином ${adminDto.username} уже существует`)
        })
        .catch(async () => {
            await this.databaseService.admin.create({
                data: adminDto,
            })

            return {
                status: true,
                message: `Администратор с именем ${adminDto.username} успешно зарегистрирован`,
            }
        })
    }

    async deleteById(id: number) {
        return await this.databaseService.admin.delete({
            where: {
                id,
            }
        })
        .catch(() => {
            return new BadRequestException(`Администратора с id: ${id} не существует`)
        })
    }

    async getAll() {
        return this.databaseService.admin.findMany()
    }
}
