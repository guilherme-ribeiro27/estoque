import { Test, TestingModule } from '@nestjs/testing';
import { UsersTypeController } from './users-type.controller';
import { UsersTypeService } from './users-type.service';

describe('UsersTypeController', () => {
  let controller: UsersTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersTypeController],
      providers: [UsersTypeService],
    }).compile();

    controller = module.get<UsersTypeController>(UsersTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
