import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { EstadisticasService } from './estadisticas.service';
import { Estadistica } from './estadistica.entity';

@Controller('estadisticas')
export class EstadisticasController {
  constructor(private readonly estadisticasService: EstadisticasService) {}

  @Get()
  findAll() {
    return this.estadisticasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.estadisticasService.findOne(id);
  }

  @Get('partido/:partidoId')
  findByPartido(@Param('partidoId') partidoId: number) {
    return this.estadisticasService.findByPartido(partidoId);
  }

  @Post()
  create(@Body() estadistica: Partial<Estadistica>) {
    return this.estadisticasService.create(estadistica);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() estadistica: Partial<Estadistica>) {
    return this.estadisticasService.update(id, estadistica);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.estadisticasService.remove(id);
  }
}
