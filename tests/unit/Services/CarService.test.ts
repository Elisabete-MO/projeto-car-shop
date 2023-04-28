import * as sinon from 'sinon';
import * as chai from 'chai';
import { describe, afterEach } from 'mocha';
import chaiAsPromised from 'chai-as-promised';
import { Model } from 'mongoose';
import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/CarService';

chai.use(chaiAsPromised);

const { expect } = chai;

describe('Service GET /car', function () {
  afterEach(() => {
    sinon.restore();
  });

  describe('Fail Cases', function () {
    it('throws a "NoCarsFound" Error', async function () {
      sinon.stub(Model, 'find').resolves(undefined);

      try {
        const service = new CarService();
        await service.getAll();
      } catch (error) {
        expect((error as Error).message).to.be.equal('NoCarsFound');
      }
    });

    it('throws a "CarNotFound" Error if id not found', async function () {
      sinon.stub(Model, 'findById').resolves(undefined);

      try {
        const service = new CarService();
        await service.getById('644ae581d5be6d62cc487471');
      } catch (error) {
        expect((error as Error).message).to.be.equal('CarNotFound');
      }
    });
  });

  describe('Success Cases', function () {
    it('GET cars/ => should return an array with all cars', async function () {
      const dbOutput = [new Car({
        id: '644ae581d5be6d62cc487471',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      })];
    
      sinon.stub(Model, 'find').resolves(dbOutput);

      const service = new CarService();
      const result = await service.getAll();
      expect(result).to.be.an('array');
      expect(result).to.be.deep.equal(dbOutput);
    });

    it('GET cars/:id => should return an object with a car', async function () {
      const dbOutput = new Car({
        id: '644ae581d5be6d62cc487471',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      });

      sinon.stub(Model, 'findById').resolves(dbOutput);

      const service = new CarService();
      const result = await service.getById('644ae581d5be6d62cc487471');
      expect(result).to.be.an('object');
      expect(result).to.be.deep.equal(dbOutput);
    });

    it('POST cars/ => should return an object with a car', async function () {
      const bodyInput = {
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      };

      const dbOutput = new Car({
        id: '644ae581d5be6d62cc487471',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      });

      sinon.stub(Model, 'create').resolves(dbOutput);

      const service = new CarService();
      const result = await service.create(bodyInput);
      expect(result).to.be.an('object');
      expect(result).to.be.deep.equal(dbOutput);
    });
  });
});
