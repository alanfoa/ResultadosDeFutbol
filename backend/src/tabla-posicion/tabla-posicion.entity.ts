import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Liga } from '../ligas/liga.entity';
import { Equipo } from '../equipos/equipo.entity';

@Entity('tabla_posiciones')
export class TablaPosicion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'liga_id' })
  ligaId: number;

  @ManyToOne(() => Liga, liga => liga.tablaPosiciones)
  @JoinColumn({ name: 'liga_id' })
  liga: Liga;

  @Column({ name: 'equipo_id' })
  equipoId: number;

  @ManyToOne(() => Equipo, equipo => equipo.tablaPosiciones)
  @JoinColumn({ name: 'equipo_id' })
  equipo: Equipo;

  @Column()
  puntos: number;

  @Column({ name: 'pj' })
  pj: number;

  @Column({ name: 'g' })
  g: number;

  @Column({ name: 'e' })
  e: number;

  @Column({ name: 'p' })
  p: number;

  @Column({ name: 'gf' })
  gf: number;

  @Column({ name: 'gc' })
  gc: number;
}
