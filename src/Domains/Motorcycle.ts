import IMoto from '../Interfaces/IMotorcycle';
import MotoTypes from '../utils/MotoTypes';
import Vehicle from './Vehicle';

class Motorcycle extends Vehicle {
  private category: 'Street' | 'Custom' | 'Trail';
  private engineCapacity: number;

  constructor(moto: IMoto) {
    super(moto);
    if (!(moto.category in MotoTypes)) {
      throw new Error('InvalidMotoType');
    }
    this.category = moto.category as MotoTypes;
    this.engineCapacity = moto.engineCapacity;
  }
}

export default Motorcycle;