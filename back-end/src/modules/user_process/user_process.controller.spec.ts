import { Test, TestingModule } from '@nestjs/testing';
import { UserProcessController } from './user_process.controller';

describe('UserProcessController', () => {
  let controller: UserProcessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserProcessController],
    }).compile();

    controller = module.get<UserProcessController>(UserProcessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
