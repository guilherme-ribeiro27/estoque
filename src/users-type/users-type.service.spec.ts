import { Test, TestingModule } from '@nestjs/testing';
import { UsersTypeService } from './users-type.service';

describe('UsersTypeService', () => {
  let service: UsersTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersTypeService],
    }).compile();

    service = module.get<UsersTypeService>(UsersTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
