import { Test, TestingModule } from '@nestjs/testing';
import { TablaPosicionService } from './tabla-posicion.service';

describe('TablaPosicionService', () => {
  let service: TablaPosicionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TablaPosicionService],
    }).compile();

    service = module.get<TablaPosicionService>(TablaPosicionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
