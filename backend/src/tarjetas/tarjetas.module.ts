import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TarjetasService } from './tarjetas.service';
import { TarjetasController } from './tarjetas.controller';
import { Tarjeta } from './tarjeta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tarjeta])],
  providers: [TarjetasService],
  controllers: [TarjetasController]
})
export class TarjetasModule {}
