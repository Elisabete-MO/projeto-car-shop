import { Schema } from 'mongoose';
import ICar from '../Interfaces/ICar';
import Abstract from './abstract.model';

class CarODM extends Abstract<ICar> {
  constructor() {
    const schema = new Schema<ICar>({
      value: { type: String, required: true },
      owner: { type: String, required: true },
      type: { type: String, required: true },
    });
    super(schema, 'Car');
  }

  public async findAll(): Promise<ICar[]> {
    return this.model.find();
  }
}

export default CarODM;
