import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Equipo } from '../equipos/equipo.entity';
import { Partido } from '../partidos/partido.entity';
import { TablaPosicion } from '../tabla-posicion/tabla-posicion.entity';
import { Goleador } from '../goleadores/goleador.entity';
import { Asistidor } from '../asistidores/asistidor.entity';
import { Amarilla } from '../amarillas/amarilla.entity';

@Entity('ligas')
export class Liga {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  pais: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ name: 'id_api' })
  idApi: number;

  @OneToMany(() => Equipo, equipo => equipo.liga)
  equipos: Equipo[];

  @OneToMany(() => Partido, partido => partido.liga)
  partidos: Partido[];

  @OneToMany(() => TablaPosicion, tabla => tabla.liga)
  tablaPosiciones: TablaPosicion[];

  @OneToMany(() => Goleador, goleador => goleador.liga)
  goleadores: Goleador[];

  @OneToMany(() => Asistidor, asistidor => asistidor.liga)
  asistidores: Asistidor[];

  @OneToMany(() => Amarilla, amarilla => amarilla.liga)
  amarillas: Amarilla[];
}
