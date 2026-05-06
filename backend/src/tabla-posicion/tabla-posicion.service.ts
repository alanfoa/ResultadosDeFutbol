import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TablaPosicion } from './tabla-posicion.entity';

@Injectable()
export class TablaPosicionService {
  constructor(
    @InjectRepository(TablaPosicion)
    private tablaPosicionRepository: Repository<TablaPosicion>,
  ) {}

  findAll(): Promise<TablaPosicion[]> {
    return this.tablaPosicionRepository.find({ relations: ['liga', 'equipo'] });
  }

  findOne(id: number): Promise<TablaPosicion | null> {
    return this.tablaPosicionRepository.findOne({
      where: { id },
      relations: ['liga', 'equipo'],
    });
  }

  findByLiga(ligaId: number): Promise<TablaPosicion[]> {
    return this.tablaPosicionRepository.find({
      where: { ligaId },
      relations: ['equipo'],
      order: { puntos: 'DESC' },
    });
  }

  create(tablaPosicion: Partial<TablaPosicion>): Promise<TablaPosicion> {
    const newTabla = this.tablaPosicionRepository.create(tablaPosicion);
    return this.tablaPosicionRepository.save(newTabla);
  }

  async update(id: number, tablaPosicion: Partial<TablaPosicion>): Promise<TablaPosicion | null> {
    await this.tablaPosicionRepository.update(id, tablaPosicion);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.tablaPosicionRepository.delete(id);
  }
}
