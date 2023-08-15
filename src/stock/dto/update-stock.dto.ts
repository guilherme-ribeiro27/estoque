import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDate} from 'class-validator';

export class UpdateStockDto{
    @ApiProperty()
    @IsNotEmpty()
    modelId: number;

    @IsNotEmpty()
    @ApiProperty()
    size: number
}