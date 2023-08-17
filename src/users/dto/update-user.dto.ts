import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'É necessário informar o id.' })
    id: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'É necessário informar o nome.' })
    name: string;

    @ApiProperty()
    @IsEmail({}, { message: 'É Necessário informar um e-mail válido' })
    @IsNotEmpty({ message: 'É necessário informar o e-mail.' })
    email: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'É necessário informar o status.' })
    type: number;
}
