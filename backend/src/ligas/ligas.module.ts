import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LigasService } from './ligas.service';
import { LigasController } from './ligas.controller';
import { Liga } from './liga.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Liga])],
  providers: [LigasService],
  controllers: [LigasController]
})
export class LigasModule {}
