import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Jugador } from './jugador.entity';

@Injectable()
export class JugadoresService {
  constructor(
    @InjectRepository(Jugador)
    private jugadoresRepository: Repository<Jugador>,
  ) {}

  findAll(): Promise<Jugador[]> {
    return this.jugadoresRepository.find({ relations: ['equipo', 'goles', 'tarjetas'] });
  }

  findOne(id: number): Promise<Jugador | null> {
    return this.jugadoresRepository.findOne({
      where: { id },
      relations: ['equipo', 'goles', 'tarjetas'],
    });
  }

  findByEquipo(equipoId: number): Promise<Jugador[]> {
    return this.jugadoresRepository.find({
      where: { equipoId },
      relations: ['goles', 'tarjetas'],
    });
  }

  create(jugador: Partial<Jugador>): Promise<Jugador> {
    const newJugador = this.jugadoresRepository.create(jugador);
    return this.jugadoresRepository.save(newJugador);
  }

  async update(id: number, jugador: Partial<Jugador>): Promise<Jugador | null> {
    await this.jugadoresRepository.update(id, jugador);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.jugadoresRepository.delete(id);
  }
}
