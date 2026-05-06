import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Liga } from '../ligas/liga.entity';
import { Jugador } from '../jugadores/jugador.entity';
import { Equipo } from '../equipos/equipo.entity';

@Entity('goleadores')
export class Goleador {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'liga_id' })
  ligaId: number;

  @ManyToOne(() => Liga, liga => liga.goleadores)
  @JoinColumn({ name: 'liga_id' })
  liga: Liga;

  @Column({ name: 'jugador_id' })
  jugadorId: number;

  @ManyToOne(() => Jugador, jugador => jugador.goleadores)
  @JoinColumn({ name: 'jugador_id' })
  jugador: Jugador;

  @Column({ name: 'equipo_id' })
  equipoId: number;

  @ManyToOne(() => Equipo, equipo => equipo.goleadores)
  @JoinColumn({ name: 'equipo_id' })
  equipo: Equipo;

  @Column()
  goles: number;
}
