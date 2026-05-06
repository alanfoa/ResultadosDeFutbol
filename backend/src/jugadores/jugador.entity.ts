import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Equipo } from '../equipos/equipo.entity';
import { Gol } from '../goles/gol.entity';
import { Tarjeta } from '../tarjetas/tarjeta.entity';
import { Goleador } from '../goleadores/goleador.entity';
import { Asistidor } from '../asistidores/asistidor.entity';
import { Amarilla } from '../amarillas/amarilla.entity';

@Entity('jugadores')
export class Jugador {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  foto: string;

  @Column({ name: 'equipo_id' })
  equipoId: number;

  @ManyToOne(() => Equipo, equipo => equipo.jugadores)
  @JoinColumn({ name: 'equipo_id' })
  equipo: Equipo;

  @Column({ name: 'id_api' })
  idApi: number;

  @OneToMany(() => Gol, gol => gol.jugador)
  goles: Gol[];

  @OneToMany(() => Tarjeta, tarjeta => tarjeta.jugador)
  tarjetas: Tarjeta[];

  @OneToMany(() => Goleador, goleador => goleador.jugador)
  goleadores: Goleador[];

  @OneToMany(() => Asistidor, asistidor => asistidor.jugador)
  asistidores: Asistidor[];

  @OneToMany(() => Amarilla, amarilla => amarilla.jugador)
  amarillas: Amarilla[];
}
