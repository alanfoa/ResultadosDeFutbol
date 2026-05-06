import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { GolesService } from './goles.service';
import { Gol } from './gol.entity';

@Controller('goles')
export class GolesController {
  constructor(private readonly golesService: GolesService) {}

  @Get()
  findAll() {
    return this.golesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.golesService.findOne(id);
  }

  @Get('partido/:partidoId')
  findByPartido(@Param('partidoId') partidoId: number) {
    return this.golesService.findByPartido(partidoId);
  }

  @Post()
  create(@Body() gol: Partial<Gol>) {
    return this.golesService.create(gol);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() gol: Partial<Gol>) {
    return this.golesService.update(id, gol);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.golesService.remove(id);
  }
}
