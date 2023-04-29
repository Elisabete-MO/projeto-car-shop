import CarModel from '../Models/CarModel';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import VehicleService from './VehicleService';

class CarService extends VehicleService<ICar> {
  // constructor(private _model = new MotoModel()) {}
  // const newmoto = await this._model.create(moto);
  constructor() {
    super(new CarModel());
  }
  
  protected createDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }
}

export default CarService;
