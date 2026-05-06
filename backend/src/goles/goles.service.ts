import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gol } from './gol.entity';

@Injectable()
export class GolesService {
  constructor(
    @InjectRepository(Gol)
    private golesRepository: Repository<Gol>,
  ) {}

  findAll(): Promise<Gol[]> {
    return this.golesRepository.find({ relations: ['jugador', 'partido', 'equipo'] });
  }

  findOne(id: number): Promise<Gol | null> {
    return this.golesRepository.findOne({
      where: { id },
      relations: ['jugador', 'partido', 'equipo'],
    });
  }

  findByPartido(partidoId: number): Promise<Gol[]> {
    return this.golesRepository.find({
      where: { partidoId },
      relations: ['jugador', 'equipo'],
    });
  }

  create(gol: Partial<Gol>): Promise<Gol> {
    const newGol = this.golesRepository.create(gol);
    return this.golesRepository.save(newGol);
  }

  async update(id: number, gol: Partial<Gol>): Promise<Gol | null> {
    await this.golesRepository.update(id, gol);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.golesRepository.delete(id);
  }
}
