import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { FormacionesService } from './formaciones.service';
import { Formacion } from './formacion.entity';

@Controller('formaciones')
export class FormacionesController {
  constructor(private readonly formacionesService: FormacionesService) {}

  @Get()
  findAll() {
    return this.formacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.formacionesService.findOne(id);
  }

  @Get('partido/:partidoId')
  findByPartido(@Param('partidoId') partidoId: number) {
    return this.formacionesService.findByPartido(partidoId);
  }

  @Post()
  create(@Body() formacion: Partial<Formacion>) {
    return this.formacionesService.create(formacion);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() formacion: Partial<Formacion>) {
    return this.formacionesService.update(id, formacion);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.formacionesService.remove(id);
  }
}
