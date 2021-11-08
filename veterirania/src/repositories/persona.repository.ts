import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {VeterinariaDataSource} from '../datasources';
import {Persona, PersonaRelations, Mascota} from '../models';
import {MascotaRepository} from './mascota.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {

  public readonly mascotas: HasManyRepositoryFactory<Mascota, typeof Persona.prototype.id>;

  constructor(
    @inject('datasources.veterinaria') dataSource: VeterinariaDataSource, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>,
  ) {
    super(Persona, dataSource);
    this.mascotas = this.createHasManyRepositoryFactoryFor('mascotas', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
  }
}
