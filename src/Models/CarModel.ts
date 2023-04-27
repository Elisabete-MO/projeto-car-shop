import { Schema } from 'mongoose';
import ICar from '../Interfaces/ICar';
import Abstract from './AbstractModel';

class CarModel extends Abstract<ICar> {
  constructor() {
    const schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });
    super(schema, 'Car');
  }

  // public async findAll(): Promise<ICar[]> {
  //   return this.model.find();
  // }

  // public async create(car: ICar): Promise<ICar> {
  //   return this.model.create({ ...car });
  // }
}

export default CarModel;