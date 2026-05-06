import { Test, TestingModule } from '@nestjs/testing';
import { AmarillasController } from './amarillas.controller';

describe('AmarillasController', () => {
  let controller: AmarillasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AmarillasController],
    }).compile();

    controller = module.get<AmarillasController>(AmarillasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
