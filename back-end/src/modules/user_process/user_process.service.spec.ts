import { Test, TestingModule } from '@nestjs/testing';
import { UserProcessService } from './user_process.service';

describe('UserProcessService', () => {
  let service: UserProcessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserProcessService],
    }).compile();

    service = module.get<UserProcessService>(UserProcessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
