import { Test, TestingModule } from '@nestjs/testing';
import { AsistidoresService } from './asistidores.service';

describe('AsistidoresService', () => {
  let service: AsistidoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AsistidoresService],
    }).compile();

    service = module.get<AsistidoresService>(AsistidoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
