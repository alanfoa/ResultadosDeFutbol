import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PartidosService } from './partidos.service';
import { Partido } from './partido.entity';

@Controller('partidos')
export class PartidosController {
  constructor(private readonly partidosService: PartidosService) {}

  @Get()
  findAll() {
    return this.partidosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.partidosService.findOne(id);
  }

  @Get('hoy')
  findHoy() {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    return this.partidosService.findByFecha(hoy);
  }

  @Post()
  create(@Body() partido: Partial<Partido>) {
    return this.partidosService.create(partido);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() partido: Partial<Partido>) {
    return this.partidosService.update(id, partido);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.partidosService.remove(id);
  }
}
