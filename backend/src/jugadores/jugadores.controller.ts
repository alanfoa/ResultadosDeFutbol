import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { JugadoresService } from './jugadores.service';
import { Jugador } from './jugador.entity';

@Controller('jugadores')
export class JugadoresController {
  constructor(private readonly jugadoresService: JugadoresService) {}

  @Get()
  findAll() {
    return this.jugadoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.jugadoresService.findOne(id);
  }

  @Get('equipo/:equipoId')
  findByEquipo(@Param('equipoId') equipoId: number) {
    return this.jugadoresService.findByEquipo(equipoId);
  }

  @Post()
  create(@Body() jugador: Partial<Jugador>) {
    return this.jugadoresService.create(jugador);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() jugador: Partial<Jugador>) {
    return this.jugadoresService.update(id, jugador);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.jugadoresService.remove(id);
  }
}
