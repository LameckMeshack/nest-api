import { IsDefined, IsEmail, IsString, isNotEmpty } from "class-validator";


export class UserDto {
    @IsString()
    @IsEmail()
    @IsDefined()
    email: string;

    @IsString()
    @IsDefined()
    username: string;

}