import { Test, TestingModule } from '@nestjs/testing';
import { TablaPosicionController } from './tabla-posicion.controller';

describe('TablaPosicionController', () => {
  let controller: TablaPosicionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TablaPosicionController],
    }).compile();

    controller = module.get<TablaPosicionController>(TablaPosicionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
