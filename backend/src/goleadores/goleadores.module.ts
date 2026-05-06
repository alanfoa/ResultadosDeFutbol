import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoleadoresService } from './goleadores.service';
import { GoleadoresController } from './goleadores.controller';
import { Goleador } from './goleador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Goleador])],
  providers: [GoleadoresService],
  controllers: [GoleadoresController]
})
export class GoleadoresModule {}
