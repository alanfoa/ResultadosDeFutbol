import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Partido } from '../partidos/partido.entity';

@Entity('estadisticas')
export class Estadistica {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'partido_id' })
  partidoId: number;

  @ManyToOne(() => Partido, partido => partido.estadisticas)
  @JoinColumn({ name: 'partido_id' })
  partido: Partido;

  @Column({ name: 'posesion_local', nullable: true })
  posesionLocal: number;

  @Column({ name: 'posesion_visitante', nullable: true })
  posesionVisitante: number;

  @Column({ name: 'tiros_local', nullable: true })
  tirosLocal: number;

  @Column({ name: 'tiros_visitante', nullable: true })
  tirosVisitante: number;

  @Column({ name: 'tiros_arco_local', nullable: true })
  tirosArcoLocal: number;

  @Column({ name: 'tiros_arco_visitante', nullable: true })
  tirosArcoVisitante: number;

  @Column({ name: 'faltas_local', nullable: true })
  faltasLocal: number;

  @Column({ name: 'faltas_visitante', nullable: true })
  faltasVisitante: number;

  @Column({ name: 'amarillas_local', nullable: true })
  amarillasLocal: number;

  @Column({ name: 'amarillas_visitante', nullable: true })
  amarillasVisitante: number;

  @Column({ name: 'rojas_local', nullable: true })
  rojasLocal: number;

  @Column({ name: 'rojas_visitante', nullable: true })
  rojasVisitante: number;

  @Column({ name: 'corner_local', nullable: true })
  cornerLocal: number;

  @Column({ name: 'corner_visitante', nullable: true })
  cornerVisitante: number;
}
