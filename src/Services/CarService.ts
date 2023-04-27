import CarModel from '../Models/CarModel';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';

export default class CarService { 
  // constructor(private _model = new CarModel()) {}
  // const newcar = await this._model.create(car);

  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async getAll() {
    const carODM = new CarModel();
    const cars = await carODM.getAll();

    if (!cars) throw new Error('NoCarsFound');

    const result = cars.map((car) => this.createCarDomain(car));
    return result;
  }

  public async create(car: ICar) {
    const carModel = new CarModel();
    const newcar = await carModel.create(car);
    return this.createCarDomain(newcar);
  }
}
