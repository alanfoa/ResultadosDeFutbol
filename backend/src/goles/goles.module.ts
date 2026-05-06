import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GolesService } from './goles.service';
import { GolesController } from './goles.controller';
import { Gol } from './gol.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gol])],
  providers: [GolesService],
  controllers: [GolesController]
})
export class GolesModule {}
