import { ApiProperty } from '@nestjs/swagger';

export class AuthUserResponseDto{
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    access_token: string;

    @ApiProperty()
    user_type: number;
}