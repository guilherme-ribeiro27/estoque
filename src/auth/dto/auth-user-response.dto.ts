import { ApiProperty } from '@nestjs/swagger';
import { UserTypes } from '../../users-type/enums/user-types.enum';
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
    user_type: UserTypes;
}