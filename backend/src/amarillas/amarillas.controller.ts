import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { AmarillasService } from './amarillas.service';
import { Amarilla } from './amarilla.entity';

@Controller('amarillas')
export class AmarillasController {
  constructor(private readonly amarillasService: AmarillasService) {}

  @Get()
  findAll() {
    return this.amarillasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.amarillasService.findOne(id);
  }

  @Get('liga/:ligaId')
  findByLiga(@Param('ligaId') ligaId: number) {
    return this.amarillasService.findByLiga(ligaId);
  }

  @Post()
  create(@Body() amarilla: Partial<Amarilla>) {
    return this.amarillasService.create(amarilla);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() amarilla: Partial<Amarilla>) {
    return this.amarillasService.update(id, amarilla);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.amarillasService.remove(id);
  }
}
