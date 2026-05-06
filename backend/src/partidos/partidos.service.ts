import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Partido } from './partido.entity';

@Injectable()
export class PartidosService {
  constructor(
    @InjectRepository(Partido)
    private partidosRepository: Repository<Partido>,
  ) {}

  findAll(): Promise<Partido[]> {
    return this.partidosRepository.find({
      relations: ['liga', 'equipoLocal', 'equipoVisitante', 'goles', 'tarjetas'],
    });
  }

  findOne(id: number): Promise<Partido | null> {
    return this.partidosRepository.findOne({
      where: { id },
      relations: ['liga', 'equipoLocal', 'equipoVisitante', 'goles', 'tarjetas', 'estadisticas', 'formaciones'],
    });
  }

  findByFecha(fecha: Date): Promise<Partido[]> {
    return this.partidosRepository.find({
      where: { fecha },
      relations: ['liga', 'equipoLocal', 'equipoVisitante', 'goles'],
      order: { hora: 'ASC' },
    });
  }

  create(partido: Partial<Partido>): Promise<Partido> {
    const newPartido = this.partidosRepository.create(partido);
    return this.partidosRepository.save(newPartido);
  }

  async update(id: number, partido: Partial<Partido>): Promise<Partido | null> {
    await this.partidosRepository.update(id, partido);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.partidosRepository.delete(id);
  }
}
