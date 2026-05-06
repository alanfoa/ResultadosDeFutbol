import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Formacion } from './formacion.entity';

@Injectable()
export class FormacionesService {
  constructor(
    @InjectRepository(Formacion)
    private formacionesRepository: Repository<Formacion>,
  ) {}

  findAll(): Promise<Formacion[]> {
    return this.formacionesRepository.find({ relations: ['partido', 'equipo'] });
  }

  findOne(id: number): Promise<Formacion | null> {
    return this.formacionesRepository.findOne({
      where: { id },
      relations: ['partido', 'equipo'],
    });
  }

  findByPartido(partidoId: number): Promise<Formacion[]> {
    return this.formacionesRepository.find({
      where: { partidoId },
      relations: ['equipo'],
    });
  }

  create(formacion: Partial<Formacion>): Promise<Formacion> {
    const newFormacion = this.formacionesRepository.create(formacion);
    return this.formacionesRepository.save(newFormacion);
  }

  async update(id: number, formacion: Partial<Formacion>): Promise<Formacion | null> {
    await this.formacionesRepository.update(id, formacion);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.formacionesRepository.delete(id);
  }
}
