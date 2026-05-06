import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquiposService } from './equipos.service';
import { EquiposController } from './equipos.controller';
import { Equipo } from './equipo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Equipo])],
  providers: [EquiposService],
  controllers: [EquiposController]
})
export class EquiposModule {}
