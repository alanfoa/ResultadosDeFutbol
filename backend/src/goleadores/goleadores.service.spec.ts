import { Test, TestingModule } from '@nestjs/testing';
import { GoleadoresService } from './goleadores.service';

describe('GoleadoresService', () => {
  let service: GoleadoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoleadoresService],
    }).compile();

    service = module.get<GoleadoresService>(GoleadoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
