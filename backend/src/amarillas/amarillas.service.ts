import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Amarilla } from './amarilla.entity';

@Injectable()
export class AmarillasService {
  constructor(
    @InjectRepository(Amarilla)
    private amarillasRepository: Repository<Amarilla>,
  ) {}

  findAll(): Promise<Amarilla[]> {
    return this.amarillasRepository.find({ relations: ['liga', 'jugador', 'equipo'] });
  }

  findOne(id: number): Promise<Amarilla | null> {
    return this.amarillasRepository.findOne({
      where: { id },
      relations: ['liga', 'jugador', 'equipo'],
    });
  }

  findByLiga(ligaId: number): Promise<Amarilla[]> {
    return this.amarillasRepository.find({
      where: { ligaId },
      relations: ['jugador', 'equipo'],
      order: { cantidad: 'DESC' },
    });
  }

  create(amarilla: Partial<Amarilla>): Promise<Amarilla> {
    const newAmarilla = this.amarillasRepository.create(amarilla);
    return this.amarillasRepository.save(newAmarilla);
  }

  async update(id: number, amarilla: Partial<Amarilla>): Promise<Amarilla | null> {
    await this.amarillasRepository.update(id, amarilla);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.amarillasRepository.delete(id);
  }
}
