import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDate} from 'class-validator';

export class CreateModelDto {

    @ApiProperty()
    @IsNotEmpty({ message: 'É necessário informar o código EAN.' })
    ean: number

    @ApiProperty()
    @IsNotEmpty({ message: 'É necessário informar o preço.' })
    price: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'É necessário informar a descrição.' })
    description: string;
}