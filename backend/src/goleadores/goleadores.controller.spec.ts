import { Test, TestingModule } from '@nestjs/testing';
import { GoleadoresController } from './goleadores.controller';

describe('GoleadoresController', () => {
  let controller: GoleadoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoleadoresController],
    }).compile();

    controller = module.get<GoleadoresController>(GoleadoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
