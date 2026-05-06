import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Partido } from '../partidos/partido.entity';
import { Equipo } from '../equipos/equipo.entity';

@Entity('formaciones')
export class Formacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'partido_id' })
  partidoId: number;

  @ManyToOne(() => Partido, partido => partido.formaciones)
  @JoinColumn({ name: 'partido_id' })
  partido: Partido;

  @Column({ name: 'equipo_id' })
  equipoId: number;

  @ManyToOne(() => Equipo, equipo => equipo.partidosLocal)
  @JoinColumn({ name: 'equipo_id' })
  equipo: Equipo;

  @Column()
  formacion: string;

  @Column('simple-array', { name: 'titulares' })
  titulares: string[];

  @Column('simple-array', { name: 'suplentes' })
  suplentes: string[];
}
