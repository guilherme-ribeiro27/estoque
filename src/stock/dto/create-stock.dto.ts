import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDate} from 'class-validator';

export class CreateStockDto{
    @ApiProperty()
    ean:number;
    
    @ApiProperty()
    size:number;
}