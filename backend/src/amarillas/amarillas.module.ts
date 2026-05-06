import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AmarillasService } from './amarillas.service';
import { AmarillasController } from './amarillas.controller';
import { Amarilla } from './amarilla.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Amarilla])],
  providers: [AmarillasService],
  controllers: [AmarillasController]
})
export class AmarillasModule {}
