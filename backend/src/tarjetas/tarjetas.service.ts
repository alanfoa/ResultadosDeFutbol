import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarjeta } from './tarjeta.entity';

@Injectable()
export class TarjetasService {
  constructor(
    @InjectRepository(Tarjeta)
    private tarjetasRepository: Repository<Tarjeta>,
  ) {}

  findAll(): Promise<Tarjeta[]> {
    return this.tarjetasRepository.find({ relations: ['jugador', 'partido', 'equipo'] });
  }

  findOne(id: number): Promise<Tarjeta | null> {
    return this.tarjetasRepository.findOne({
      where: { id },
      relations: ['jugador', 'partido', 'equipo'],
    });
  }

  findByPartido(partidoId: number): Promise<Tarjeta[]> {
    return this.tarjetasRepository.find({
      where: { partidoId },
      relations: ['jugador', 'equipo'],
    });
  }

  create(tarjeta: Partial<Tarjeta>): Promise<Tarjeta> {
    const newTarjeta = this.tarjetasRepository.create(tarjeta);
    return this.tarjetasRepository.save(newTarjeta);
  }

  async update(id: number, tarjeta: Partial<Tarjeta>): Promise<Tarjeta | null> {
    await this.tarjetasRepository.update(id, tarjeta);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.tarjetasRepository.delete(id);
  }
}
