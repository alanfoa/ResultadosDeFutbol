import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Liga } from '../ligas/liga.entity';
import { Equipo } from '../equipos/equipo.entity';
import { Partido } from '../partidos/partido.entity';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

interface ApiResponse<T> {
  data: {
    response: T;
  };
}

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Liga)
    private readonly ligaRepo: Repository<Liga>,
    @InjectRepository(Equipo)
    private readonly equipoRepo: Repository<Equipo>,
    @InjectRepository(Partido)
    private readonly partidoRepo: Repository<Partido>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async seedLigas() {
    const ligas = [
      { idApi: 128, nombre: 'Primera División Argentina', pais: 'Argentina' },
      { idApi: 140, nombre: 'La Liga', pais: 'Spain' },
      { idApi: 2, nombre: 'UEFA Champions League', pais: 'Europe' },
      { idApi: 3, nombre: 'UEFA Europa League', pais: 'Europe' },
      { idApi: 39, nombre: 'Premier League', pais: 'England' },
      { idApi: 135, nombre: 'Serie A', pais: 'Italy' },
      { idApi: 78, nombre: 'Bundesliga', pais: 'Germany' },
    ];

    for (const ligaData of ligas) {
      const existe = await this.ligaRepo.findOne({ where: { idApi: ligaData.idApi } });
      if (!existe) {
        const liga = this.ligaRepo.create(ligaData);
        await this.ligaRepo.save(liga);
      }
    }

    return { message: 'Ligas cargadas' };
  }

  async seedEquipos() {
    const apiKey = this.configService.get<string>('RAPIDAPI_KEY');
    const apiHost = this.configService.get<string>('API_FOOTBALL_HOST') || 'v3.football.api-sports.io';
    const ligas = await this.ligaRepo.find();

    for (const liga of ligas) {
      try {
        const response = await firstValueFrom<AxiosResponse>(
          this.httpService.get(`https://${apiHost}/teams`, {
            headers: { 'x-rapidapi-key': apiKey, 'x-rapidapi-host': apiHost },
            params: { league: liga.idApi, season: 2025 },
          }),
        );

        const equipos = response.data.response;
        for (const item of equipos) {
          const existe = await this.equipoRepo.findOne({
            where: { idApi: item.team.id },
          });

          if (!existe) {
            const equipo = this.equipoRepo.create({
              nombre: item.team.name,
              logo: item.team.logo,
              ligaId: liga.id,
              idApi: item.team.id,
            });
            await this.equipoRepo.save(equipo);
          }
        }
      } catch (error) {
        console.error(`Error cargando equipos para ${liga.nombre}:`, error.message);
      }
    }

    return { message: 'Equipos cargados' };
  }

  async seedPartidosHoy() {
    const apiKey = this.configService.get<string>('RAPIDAPI_KEY');
    const apiHost = this.configService.get<string>('API_FOOTBALL_HOST') || 'v3.football.api-sports.io';
    const hoy = new Date().toISOString().split('T')[0];

    const ligas = await this.ligaRepo.find();

    for (const liga of ligas) {
      try {
        const response = await firstValueFrom<AxiosResponse>(
          this.httpService.get(`https://${apiHost}/fixtures`, {
            headers: { 'x-rapidapi-key': apiKey, 'x-rapidapi-host': apiHost },
            params: { league: liga.idApi, season: 2025, date: hoy },
          }),
        );

        const partidos = response.data.response;
        for (const item of partidos) {
          const existe = await this.partidoRepo.findOne({
            where: { idApi: item.fixture.id },
          });

          if (!existe) {
            const equipoLocal = await this.equipoRepo.findOne({
              where: { idApi: item.teams.home.id },
            });
            const equipoVisitante = await this.equipoRepo.findOne({
              where: { idApi: item.teams.away.id },
            });

            if (equipoLocal && equipoVisitante) {
              const partido = this.partidoRepo.create({
                fecha: new Date(item.fixture.date),
                hora: new Date(item.fixture.date).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
                estado: item.fixture.status.short,
                golesLocal: item.goals.home || 0,
                golesVisitante: item.goals.away || 0,
                ligaId: liga.id,
                equipoLocalId: equipoLocal.id,
                equipoVisitanteId: equipoVisitante.id,
                idApi: item.fixture.id,
              });
              await this.partidoRepo.save(partido);
            }
          }
        }
      } catch (error) {
        console.error(`Error cargando partidos para ${liga.nombre}:`, error.message);
      }
    }

    return { message: 'Partidos cargados' };
  }

  async seedAll() {
    await this.seedLigas();
    await this.seedEquipos();
    await this.seedPartidosHoy();
    return { message: 'Seed completo' };
  }
}
