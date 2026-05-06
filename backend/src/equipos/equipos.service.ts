import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipo } from './equipo.entity';

@Injectable()
export class EquiposService {
  constructor(
    @InjectRepository(Equipo)
    private equiposRepository: Repository<Equipo>,
  ) {}

  findAll(): Promise<Equipo[]> {
    return this.equiposRepository.find({ relations: ['liga', 'jugadores'] });
  }

  findOne(id: number): Promise<Equipo | null> {
    return this.equiposRepository.findOne({
      where: { id },
      relations: ['liga', 'jugadores'],
    });
  }

  findByLiga(ligaId: number): Promise<Equipo[]> {
    return this.equiposRepository.find({
      where: { ligaId },
      relations: ['jugadores'],
    });
  }

  create(equipo: Partial<Equipo>): Promise<Equipo> {
    const newEquipo = this.equiposRepository.create(equipo);
    return this.equiposRepository.save(newEquipo);
  }

  async update(id: number, equipo: Partial<Equipo>): Promise<Equipo | null> {
    await this.equiposRepository.update(id, equipo);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.equiposRepository.delete(id);
  }
}
