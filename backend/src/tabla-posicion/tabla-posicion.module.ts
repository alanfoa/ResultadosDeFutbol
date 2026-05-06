import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TablaPosicionService } from './tabla-posicion.service';
import { TablaPosicionController } from './tabla-posicion.controller';
import { TablaPosicion } from './tabla-posicion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TablaPosicion])],
  providers: [TablaPosicionService],
  controllers: [TablaPosicionController]
})
export class TablaPosicionModule {}
