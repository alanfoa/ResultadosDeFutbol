import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Goleador } from './goleador.entity';

@Injectable()
export class GoleadoresService {
  constructor(
    @InjectRepository(Goleador)
    private goleadoresRepository: Repository<Goleador>,
  ) {}

  findAll(): Promise<Goleador[]> {
    return this.goleadoresRepository.find({ relations: ['liga', 'jugador', 'equipo'] });
  }

  findOne(id: number): Promise<Goleador | null> {
    return this.goleadoresRepository.findOne({
      where: { id },
      relations: ['liga', 'jugador', 'equipo'],
    });
  }

  findByLiga(ligaId: number): Promise<Goleador[]> {
    return this.goleadoresRepository.find({
      where: { ligaId },
      relations: ['jugador', 'equipo'],
      order: { goles: 'DESC' },
    });
  }

  create(goleador: Partial<Goleador>): Promise<Goleador> {
    const newGoleador = this.goleadoresRepository.create(goleador);
    return this.goleadoresRepository.save(newGoleador);
  }

  async update(id: number, goleador: Partial<Goleador>): Promise<Goleador | null> {
    await this.goleadoresRepository.update(id, goleador);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.goleadoresRepository.delete(id);
  }
}
