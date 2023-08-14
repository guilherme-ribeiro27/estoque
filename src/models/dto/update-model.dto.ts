import { PartialType } from "@nestjs/swagger";
import { CreateModelDto } from "./create-model.dto";
import { ApiProperty } from '@nestjs/swagger';
export class UpdateModelDto extends PartialType(CreateModelDto){
    @ApiProperty()
    id: number;
}