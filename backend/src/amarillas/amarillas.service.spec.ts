import { Test, TestingModule } from '@nestjs/testing';
import { AmarillasService } from './amarillas.service';

describe('AmarillasService', () => {
  let service: AmarillasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AmarillasService],
    }).compile();

    service = module.get<AmarillasService>(AmarillasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
