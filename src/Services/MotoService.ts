import MotoModel from '../Models/MotoModel';
import Moto from '../Domains/Motorcycle';
import IMoto from '../Interfaces/IMotorcycle';

export default class MotoService { 
  // constructor(private _model = new MotoModel()) {}
  // const newmoto = await this._model.create(moto);

  private createMotoDomain(moto: IMoto | null): Moto | null {
    if (moto) {
      return new Moto(moto);
    }
    return null;
  }

  public async getAll() {
    const motoODM = new MotoModel();
    const motos = await motoODM.getAll();

    if (!motos) throw new Error('NoMotosFound');

    const result = motos.map((moto) => this.createMotoDomain(moto));
    return result;
  }

  public async getById(id: string) {
    const motoODM = new MotoModel();
    const moto = await motoODM.getById(id);
    if (!moto) throw new Error('MotoNotFound');
    return this.createMotoDomain(moto);
  }

  public async create(moto: IMoto) {
    const motoModel = new MotoModel();
    const newmoto = await motoModel.create(moto);
    return this.createMotoDomain(newmoto);
  }

  public async update(id: string, moto: IMoto) {
    if (await this.getById(id)) {
      const motoModel = new MotoModel();
      const upMoto = await motoModel.update(id, moto);
      return this.createMotoDomain(upMoto);
    }
    throw new Error('MotoNotFound');
  }
}
