import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsistidoresService } from './asistidores.service';
import { AsistidoresController } from './asistidores.controller';
import { Asistidor } from './asistidor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Asistidor])],
  providers: [AsistidoresService],
  controllers: [AsistidoresController]
})
export class AsistidoresModule {}
