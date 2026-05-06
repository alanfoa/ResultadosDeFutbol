import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { EquiposService } from './equipos.service';
import { Equipo } from './equipo.entity';

@Controller('equipos')
export class EquiposController {
  constructor(private readonly equiposService: EquiposService) {}

  @Get()
  findAll() {
    return this.equiposService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.equiposService.findOne(id);
  }

  @Get('liga/:ligaId')
  findByLiga(@Param('ligaId') ligaId: number) {
    return this.equiposService.findByLiga(ligaId);
  }

  @Post()
  create(@Body() equipo: Partial<Equipo>) {
    return this.equiposService.create(equipo);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() equipo: Partial<Equipo>) {
    return this.equiposService.update(id, equipo);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.equiposService.remove(id);
  }
}
