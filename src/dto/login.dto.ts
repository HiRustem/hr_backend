import { IsNumber, IsString, Max, Min } from 'class-validator'

export class LoginDto {
    @IsString()
    username: string;

    @IsString()
    password: string;
}

