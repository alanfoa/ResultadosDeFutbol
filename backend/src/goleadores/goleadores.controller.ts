import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { GoleadoresService } from './goleadores.service';
import { Goleador } from './goleador.entity';

@Controller('goleadores')
export class GoleadoresController {
  constructor(private readonly goleadoresService: GoleadoresService) {}

  @Get()
  findAll() {
    return this.goleadoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.goleadoresService.findOne(id);
  }

  @Get('liga/:ligaId')
  findByLiga(@Param('ligaId') ligaId: number) {
    return this.goleadoresService.findByLiga(ligaId);
  }

  @Post()
  create(@Body() goleador: Partial<Goleador>) {
    return this.goleadoresService.create(goleador);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() goleador: Partial<Goleador>) {
    return this.goleadoresService.update(id, goleador);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.goleadoresService.remove(id);
  }
}
