import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TablaPosicionService } from './tabla-posicion.service';
import { TablaPosicion } from './tabla-posicion.entity';

@Controller('tabla-posicion')
export class TablaPosicionController {
  constructor(private readonly tablaPosicionService: TablaPosicionService) {}

  @Get()
  findAll() {
    return this.tablaPosicionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tablaPosicionService.findOne(id);
  }

  @Get('liga/:ligaId')
  findByLiga(@Param('ligaId') ligaId: number) {
    return this.tablaPosicionService.findByLiga(ligaId);
  }

  @Post()
  create(@Body() tablaPosicion: Partial<TablaPosicion>) {
    return this.tablaPosicionService.create(tablaPosicion);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() tablaPosicion: Partial<TablaPosicion>) {
    return this.tablaPosicionService.update(id, tablaPosicion);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tablaPosicionService.remove(id);
  }
}
