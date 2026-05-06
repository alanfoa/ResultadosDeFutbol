import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asistidor } from './asistidor.entity';

@Injectable()
export class AsistidoresService {
  constructor(
    @InjectRepository(Asistidor)
    private asistidoresRepository: Repository<Asistidor>,
  ) {}

  findAll(): Promise<Asistidor[]> {
    return this.asistidoresRepository.find({ relations: ['liga', 'jugador', 'equipo'] });
  }

  findOne(id: number): Promise<Asistidor | null> {
    return this.asistidoresRepository.findOne({
      where: { id },
      relations: ['liga', 'jugador', 'equipo'],
    });
  }

  findByLiga(ligaId: number): Promise<Asistidor[]> {
    return this.asistidoresRepository.find({
      where: { ligaId },
      relations: ['jugador', 'equipo'],
      order: { asistencias: 'DESC' },
    });
  }

  create(asistidor: Partial<Asistidor>): Promise<Asistidor> {
    const newAsistidor = this.asistidoresRepository.create(asistidor);
    return this.asistidoresRepository.save(newAsistidor);
  }

  async update(id: number, asistidor: Partial<Asistidor>): Promise<Asistidor | null> {
    await this.asistidoresRepository.update(id, asistidor);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.asistidoresRepository.delete(id);
  }
}
