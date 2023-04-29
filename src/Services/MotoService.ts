import MotoModel from '../Models/MotoModel';
import Moto from '../Domains/Motorcycle';
import IMoto from '../Interfaces/IMotorcycle';
import VehicleService from './VehicleService';

class MotoService extends VehicleService<IMoto> {
  constructor() {
    super(new MotoModel());
  }
  protected createDomain(moto: IMoto | null): Moto | null {
    if (moto) {
      return new Moto(moto);
    }
    return null;
  }
}

export default MotoService;
