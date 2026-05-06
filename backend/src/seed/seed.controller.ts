import { Controller, Post, Get } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post('ligas')
  async seedLigas() {
    return this.seedService.seedLigas();
  }

  @Post('equipos')
  async seedEquipos() {
    return this.seedService.seedEquipos();
  }

  @Post('partidos-hoy')
  async seedPartidosHoy() {
    return this.seedService.seedPartidosHoy();
  }

  @Post('all')
  async seedAll() {
    return this.seedService.seedAll();
  }

  @Get('test')
  async test() {
    return { message: 'Seed module funcionando' };
  }
}
