import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartidosService } from './partidos.service';
import { PartidosController } from './partidos.controller';
import { Partido } from './partido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Partido])],
  providers: [PartidosService],
  controllers: [PartidosController]
})
export class PartidosModule {}
