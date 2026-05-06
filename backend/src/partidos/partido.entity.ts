import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Liga } from '../ligas/liga.entity';
import { Equipo } from '../equipos/equipo.entity';
import { Gol } from '../goles/gol.entity';
import { Tarjeta } from '../tarjetas/tarjeta.entity';
import { Estadistica } from '../estadisticas/estadistica.entity';
import { Formacion } from '../formaciones/formacion.entity';

@Entity('partidos')
export class Partido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'fecha' })
  fecha: Date;

  @Column({ name: 'hora', nullable: true })
  hora: string;

  @Column({ name: 'estado' })
  estado: string;

  @Column({ name: 'goles_local', default: 0 })
  golesLocal: number;

  @Column({ name: 'goles_visitante', default: 0 })
  golesVisitante: number;

  @Column({ name: 'liga_id' })
  ligaId: number;

  @ManyToOne(() => Liga, liga => liga.partidos)
  @JoinColumn({ name: 'liga_id' })
  liga: Liga;

  @Column({ name: 'equipo_local_id' })
  equipoLocalId: number;

  @ManyToOne(() => Equipo, equipo => equipo.partidosLocal)
  @JoinColumn({ name: 'equipo_local_id' })
  equipoLocal: Equipo;

  @Column({ name: 'equipo_visitante_id' })
  equipoVisitanteId: number;

  @ManyToOne(() => Equipo, equipo => equipo.partidosVisitante)
  @JoinColumn({ name: 'equipo_visitante_id' })
  equipoVisitante: Equipo;

  @Column({ name: 'id_api' })
  idApi: number;

  @OneToMany(() => Gol, gol => gol.partido)
  goles: Gol[];

  @OneToMany(() => Tarjeta, tarjeta => tarjeta.partido)
  tarjetas: Tarjeta[];

  @OneToMany(() => Estadistica, estadistica => estadistica.partido)
  estadisticas: Estadistica[];

  @OneToMany(() => Formacion, formacion => formacion.partido)
  formaciones: Formacion[];
}
