import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { LigasService } from './ligas.service';
import { Liga } from './liga.entity';

@Controller('ligas')
export class LigasController {
  constructor(private readonly ligasService: LigasService) {}

  @Get()
  findAll() {
    return this.ligasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.ligasService.findOne(id);
  }

  @Post()
  create(@Body() liga: Partial<Liga>) {
    return this.ligasService.create(liga);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() liga: Partial<Liga>) {
    return this.ligasService.update(id, liga);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.ligasService.remove(id);
  }
}
