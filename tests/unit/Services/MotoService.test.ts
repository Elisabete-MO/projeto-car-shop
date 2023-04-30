import * as sinon from 'sinon';
import * as chai from 'chai';
import { describe, afterEach } from 'mocha';
import chaiAsPromised from 'chai-as-promised';
import { Model } from 'mongoose';
import Moto from '../../../src/Domains/Motorcycle';
import MotoService from '../../../src/Services/MotoService';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';

chai.use(chaiAsPromised);

const { expect } = chai;

describe('Service /motorcycles', function () {
  afterEach(() => {
    sinon.restore();
  });

  describe('Fail Cases', function () {
    it('GET motos/:id => throws a "MotoNotFound" Error if id not found', async function () {
      sinon.stub(Model, 'findById').resolves(undefined);

      try {
        const service = new MotoService();
        await service.getById('644ae581d5be6d62cc487471');
      } catch (error) {
        expect((error as Error).message).to.be.equal('MotoNotFound');
      }
    });

    it('PUT motorcycles/ => throws a "MotoNotFound" Error if id not found', async function () {
      const id = '644ae581d5be6d62cc487471';
      const bodyInput: IMotorcycle = {
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        category: 'Street',
        engineCapacity: 5,
      };

      sinon.stub(Model, 'findById').resolves(undefined);

      try {
        const service = new MotoService();
        await service.update(id, bodyInput);
      } catch (error) {
        expect((error as Error).message).to.be.equal('MotoNotFound');
      }
    });
  });

  describe('Success Cases', function () {
    it('GET motos/ => should return an array with all motos', async function () {
      const dbOutput = [new Moto({
        id: '644ae581d5be6d62cc487471',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        category: 'Street',
        engineCapacity: 5,
      })];
    
      sinon.stub(Model, 'find').resolves(dbOutput);

      const service = new MotoService();
      const result = await service.getAll();
      expect(result).to.be.an('array');
      expect(result).to.be.deep.equal(dbOutput);
    });

    it('GET motos/:id => should return an object with a moto', async function () {
      const dbOutput = new Moto({
        id: '644ae581d5be6d62cc487471',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        category: 'Street',
        engineCapacity: 5,
      });

      sinon.stub(Model, 'findById').resolves(dbOutput);

      const service = new MotoService();
      const result = await service.getById('644ae581d5be6d62cc487471');
      expect(result).to.be.an('object');
      expect(result).to.be.deep.equal(dbOutput);
    });

    it('POST motorcycles/ => should return an object with a moto', async function () {
      const bodyInput: IMotorcycle = {
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        category: 'Street',
        engineCapacity: 5,
      };

      const dbOutput = new Moto({
        id: '644ae581d5be6d62cc487471',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        category: 'Street',
        engineCapacity: 5,
      });

      sinon.stub(Model, 'create').resolves(dbOutput);

      const service = new MotoService();
      const result = await service.create(bodyInput);
      expect(result).to.be.an('object');
      expect(result).to.be.deep.equal(dbOutput);
    });

    it('PUT motorcycles/:id => throws a "MotoNotFound" Error if id not found', async function () {
      const id = '644ae581d5be6d62cc487471';
      const bodyInput: IMotorcycle = ({
        model: 'Marea',
        year: 2002,
        color: 'Yellow',
        status: true,
        buyValue: 15.99,
        category: 'Street',
        engineCapacity: 5,
      });

      sinon.stub(Model, 'findById').resolves(undefined);

      try {
        const service = new MotoService();
        await service.update(id, bodyInput);
      } catch (error) {
        expect((error as Error).message).to.be.equal('MotoNotFound');
      }
    });
  });
});
