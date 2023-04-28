import { Schema } from 'mongoose';
import IMoto from '../Interfaces/IMotorcycle';
import Abstract from './AbstractODM';

class MotoModel extends Abstract<IMoto> {
  constructor() {
    const schema = new Schema<IMoto>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean },
      buyValue: { type: Number, required: true },
      category: { type: String, required: true },
      engineCapacity: { type: Number, required: true },
    });
    super(schema, 'Motorcycle'); // 'Motorcycle' nome da collection (tabela)
  }
}

export default MotoModel;
