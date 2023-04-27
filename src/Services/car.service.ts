import CarModel from '../Models/car.model';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';

export default class CarService { 
  constructor(private _model = new CarModel()) {}

  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(
        car.value,
        car.owner,
        car.type,
        car.id,
      );
    }
    return null;
  }

  public async getAll() {
    const cars = await this._model.findAll();

    if (!cars) throw new Error('NoCarsFound');

    const result = cars.map((car) => this.createCarDomain(car));
    return result;
  }
}
