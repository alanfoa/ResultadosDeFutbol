import { Test, TestingModule } from '@nestjs/testing';
import { AsistidoresController } from './asistidores.controller';

describe('AsistidoresController', () => {
  let controller: AsistidoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AsistidoresController],
    }).compile();

    controller = module.get<AsistidoresController>(AsistidoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
