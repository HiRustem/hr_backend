import { IsNumber, IsString, Max, Min } from 'class-validator'

export class UserDto {

    @IsString()
    name: string;

    @Min(18)
    @Max(100)
    @IsNumber()
    age: number;
}

