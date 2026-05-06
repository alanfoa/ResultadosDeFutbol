import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { Liga } from '../ligas/liga.entity';
import { Equipo } from '../equipos/equipo.entity';
import { Partido } from '../partidos/partido.entity';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    TypeOrmModule.forFeature([Liga, Equipo, Partido]),
  ],
  providers: [SeedService],
  controllers: [SeedController],
})
export class SeedModule {}
