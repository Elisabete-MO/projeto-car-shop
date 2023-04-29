import AbstractODM from '../Models/AbstractODM';
import CarModel from '../Models/CarModel';

export default abstract class VehicleService<T> {
  constructor(private _model: AbstractODM<T>) {}

  protected abstract createDomain(data: T | null): any;

  public getErrorMessage(): string {
    if (this._model instanceof CarModel) return 'CarNotFound';  
    return 'MotoNotFound';
  }

  public async getAll() {
    const vehicles = await this._model.getAll();

    if (!vehicles) throw new Error('NoVehiclesFound');

    const result = vehicles.map((vehicle: T) => this.createDomain(vehicle));
    return result;
  }

  public async getById(id: string) {
    const vehicle = await this._model.getById(id);
    if (!vehicle) throw new Error(this.getErrorMessage());
    return this.createDomain(vehicle);
  }

  public async create(vehicle: T) {
    const newVehicle = await this._model.create(vehicle);
    return this.createDomain(newVehicle);
  }

  public async update(id: string, vehicle: T) {
    if (await this.getById(id)) {
      const updatedVehicle = await this._model.update(id, vehicle);
      return this.createDomain(updatedVehicle);
    }
    throw new Error(this.getErrorMessage());
  }
}
