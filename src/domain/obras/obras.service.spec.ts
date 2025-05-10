import { Test, TestingModule } from '@nestjs/testing';
import { ObrasService } from './obras.service';

describe('ObrasService', () => {
  let service: ObrasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ObrasService],
    }).compile();

    service = module.get<ObrasService>(ObrasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
