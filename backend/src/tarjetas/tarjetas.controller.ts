import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TarjetasService } from './tarjetas.service';
import { Tarjeta } from './tarjeta.entity';

@Controller('tarjetas')
export class TarjetasController {
  constructor(private readonly tarjetasService: TarjetasService) {}

  @Get()
  findAll() {
    return this.tarjetasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tarjetasService.findOne(id);
  }

  @Get('partido/:partidoId')
  findByPartido(@Param('partidoId') partidoId: number) {
    return this.tarjetasService.findByPartido(partidoId);
  }

  @Post()
  create(@Body() tarjeta: Partial<Tarjeta>) {
    return this.tarjetasService.create(tarjeta);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() tarjeta: Partial<Tarjeta>) {
    return this.tarjetasService.update(id, tarjeta);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tarjetasService.remove(id);
  }
}
