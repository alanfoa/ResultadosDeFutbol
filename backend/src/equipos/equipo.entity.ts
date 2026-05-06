import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Liga } from '../ligas/liga.entity';
import { Jugador } from '../jugadores/jugador.entity';
import { Partido } from '../partidos/partido.entity';
import { TablaPosicion } from '../tabla-posicion/tabla-posicion.entity';
import { Goleador } from '../goleadores/goleador.entity';
import { Asistidor } from '../asistidores/asistidor.entity';
import { Amarilla } from '../amarillas/amarilla.entity';

@Entity('equipos')
export class Equipo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ name: 'liga_id' })
  ligaId: number;

  @ManyToOne(() => Liga, liga => liga.equipos)
  @JoinColumn({ name: 'liga_id' })
  liga: Liga;

  @Column({ name: 'id_api' })
  idApi: number;

  @OneToMany(() => Jugador, jugador => jugador.equipo)
  jugadores: Jugador[];

  @OneToMany(() => Partido, partido => partido.equipoLocal)
  partidosLocal: Partido[];

  @OneToMany(() => Partido, partido => partido.equipoVisitante)
  partidosVisitante: Partido[];

  @OneToMany(() => TablaPosicion, tabla => tabla.equipo)
  tablaPosiciones: TablaPosicion[];

  @OneToMany(() => Goleador, goleador => goleador.equipo)
  goleadores: Goleador[];

  @OneToMany(() => Asistidor, asistidor => asistidor.equipo)
  asistidores: Asistidor[];

  @OneToMany(() => Amarilla, amarilla => amarilla.equipo)
  amarillas: Amarilla[];
}
