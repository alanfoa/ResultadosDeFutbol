import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PartidosModule } from './partidos/partidos.module';
import { LigasModule } from './ligas/ligas.module';
import { EquiposModule } from './equipos/equipos.module';
import { JugadoresModule } from './jugadores/jugadores.module';
import { GolesModule } from './goles/goles.module';
import { TarjetasModule } from './tarjetas/tarjetas.module';
import { FormacionesModule } from './formaciones/formaciones.module';
import { EstadisticasModule } from './estadisticas/estadisticas.module';
import { TablaPosicionModule } from './tabla-posicion/tabla-posicion.module';
import { GoleadoresModule } from './goleadores/goleadores.module';
import { AsistidoresModule } from './asistidores/asistidores.module';
import { AmarillasModule } from './amarillas/amarillas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database/database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    PartidosModule,
    LigasModule,
    EquiposModule,
    JugadoresModule,
    GolesModule,
    TarjetasModule,
    FormacionesModule,
    EstadisticasModule,
    TablaPosicionModule,
    GoleadoresModule,
    AsistidoresModule,
    AmarillasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
