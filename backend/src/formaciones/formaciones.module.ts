import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormacionesService } from './formaciones.service';
import { FormacionesController } from './formaciones.controller';
import { Formacion } from './formacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Formacion])],
  providers: [FormacionesService],
  controllers: [FormacionesController]
})
export class FormacionesModule {}
