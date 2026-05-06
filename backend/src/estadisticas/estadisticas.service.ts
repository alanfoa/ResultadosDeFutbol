import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estadistica } from './estadistica.entity';

@Injectable()
export class EstadisticasService {
  constructor(
    @InjectRepository(Estadistica)
    private estadisticasRepository: Repository<Estadistica>,
  ) {}

  findAll(): Promise<Estadistica[]> {
    return this.estadisticasRepository.find({ relations: ['partido'] });
  }

  findOne(id: number): Promise<Estadistica | null> {
    return this.estadisticasRepository.findOne({
      where: { id },
      relations: ['partido'],
    });
  }

  findByPartido(partidoId: number): Promise<Estadistica[]> {
    return this.estadisticasRepository.find({
      where: { partidoId },
    });
  }

  create(estadistica: Partial<Estadistica>): Promise<Estadistica> {
    const newEstadistica = this.estadisticasRepository.create(estadistica);
    return this.estadisticasRepository.save(newEstadistica);
  }

  async update(id: number, estadistica: Partial<Estadistica>): Promise<Estadistica | null> {
    await this.estadisticasRepository.update(id, estadistica);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.estadisticasRepository.delete(id);
  }
}
