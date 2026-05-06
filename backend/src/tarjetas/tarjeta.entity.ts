import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Jugador } from '../jugadores/jugador.entity';
import { Partido } from '../partidos/partido.entity';
import { Equipo } from '../equipos/equipo.entity';

@Entity('tarjetas')
export class Tarjeta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'jugador_id' })
  jugadorId: number;

  @ManyToOne(() => Jugador, jugador => jugador.tarjetas)
  @JoinColumn({ name: 'jugador_id' })
  jugador: Jugador;

  @Column({ name: 'partido_id' })
  partidoId: number;

  @ManyToOne(() => Partido, partido => partido.tarjetas)
  @JoinColumn({ name: 'partido_id' })
  partido: Partido;

  @Column()
  minuto: number;

  @Column()
  tipo: string;

  @Column({ name: 'equipo_id' })
  equipoId: number;

  @ManyToOne(() => Equipo, equipo => equipo.partidosLocal)
  @JoinColumn({ name: 'equipo_id' })
  equipo: Equipo;
}
