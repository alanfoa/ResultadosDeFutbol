import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Liga } from './liga.entity';

@Injectable()
export class LigasService {
  constructor(
    @InjectRepository(Liga)
    private ligasRepository: Repository<Liga>,
  ) {}

  findAll(): Promise<Liga[]> {
    return this.ligasRepository.find({ relations: ['equipos', 'partidos'] });
  }

  findOne(id: number): Promise<Liga | null> {
    return this.ligasRepository.findOne({
      where: { id },
      relations: ['equipos', 'partidos'],
    });
  }

  create(liga: Partial<Liga>): Promise<Liga> {
    const newLiga = this.ligasRepository.create(liga);
    return this.ligasRepository.save(newLiga);
  }

  async update(id: number, liga: Partial<Liga>): Promise<Liga | null> {
    await this.ligasRepository.update(id, liga);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.ligasRepository.delete(id);
  }
}
