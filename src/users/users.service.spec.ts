import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma.service';

describe('UsersService', () => {
    let prismaService:PrismaService;
    let usersService:UsersService;
    
    beforeEach(()=>{
        prismaService = new PrismaService();
        usersService = new UsersService(prismaService);
    })
    
    it('should create a user successfully',async ()=>{
        const user = {
            name: 'Teste',
            email: 'teste@estoque.com',
            password: '123456', //vai ser criptografada na execução do método
            type: 3,
        }

        const createdUser = await usersService.createUser(user);

        expect(createdUser).toHaveProperty('id');
    })
});
