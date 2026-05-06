import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { AsistidoresService } from './asistidores.service';
import { Asistidor } from './asistidor.entity';

@Controller('asistidores')
export class AsistidoresController {
  constructor(private readonly asistidoresService: AsistidoresService) {}

  @Get()
  findAll() {
    return this.asistidoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.asistidoresService.findOne(id);
  }

  @Get('liga/:ligaId')
  findByLiga(@Param('ligaId') ligaId: number) {
    return this.asistidoresService.findByLiga(ligaId);
  }

  @Post()
  create(@Body() asistidor: Partial<Asistidor>) {
    return this.asistidoresService.create(asistidor);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() asistidor: Partial<Asistidor>) {
    return this.asistidoresService.update(id, asistidor);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.asistidoresService.remove(id);
  }
}
