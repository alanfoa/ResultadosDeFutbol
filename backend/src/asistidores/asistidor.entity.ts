import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Liga } from '../ligas/liga.entity';
import { Jugador } from '../jugadores/jugador.entity';
import { Equipo } from '../equipos/equipo.entity';

@Entity('asistidores')
export class Asistidor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'liga_id' })
  ligaId: number;

  @ManyToOne(() => Liga, liga => liga.asistidores)
  @JoinColumn({ name: 'liga_id' })
  liga: Liga;

  @Column({ name: 'jugador_id' })
  jugadorId: number;

  @ManyToOne(() => Jugador, jugador => jugador.asistidores)
  @JoinColumn({ name: 'jugador_id' })
  jugador: Jugador;

  @Column({ name: 'equipo_id' })
  equipoId: number;

  @ManyToOne(() => Equipo, equipo => equipo.asistidores)
  @JoinColumn({ name: 'equipo_id' })
  equipo: Equipo;

  @Column()
  asistencias: number;
}
