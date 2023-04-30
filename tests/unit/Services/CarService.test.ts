import * as sinon from 'sinon';
import * as chai from 'chai';
import { describe, afterEach } from 'mocha';
import { Model } from 'mongoose';
import { assert } from 'chai';
import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/CarService';
import ICar from '../../../src/Interfaces/ICar';

const { expect } = chai;

describe('Service /cars', function () {
  afterEach(() => {
    sinon.restore();
  });

  describe('Fail Cases', function () {
    // it('GET cars/ => throws a "NoCarsFound" Error', async function () {
    //   sinon.stub(Model, 'find').resolves(undefined);

    //   try {
    //     const service = new CarService();
    //     await service.getAll();
    //   } catch (error) {
    //     expect((error as Error).message).to.be.equal('NoCarsFound');
    //   }
    // });

    it('GET cars/:id => throws a "CarNotFound" Error if id not found', async function () {
      sinon.stub(Model, 'findById').resolves(undefined);

      try {
        const service = new CarService();
        await service.getById('644ae581d5be6d62cc487471');
      } catch (error) {
        expect((error as Error).message).to.be.equal('CarNotFound');
      }
    });

    it('PUT cars/ => throws a "CarNotFound" Error if id not found', async function () {
      const id = '644ae581d5be6d62cc487471';
      const bodyInput = {
        model: 'Marea',
        year: 2002,
        color: 'Yellow',
        status: true,
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      };

      sinon.stub(Model, 'findById').resolves(undefined);

      try {
        const service = new CarService();
        await service.update(id, bodyInput);
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

    it('PUT cars/:id => should return an object with a car', async function () {
      const id = '644ae581d5be6d62cc487471';
      const bodyInput: ICar = {
        model: 'Marea',
        year: 2002,
        color: 'Yellow',
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

      const updatedResult = {
        acknowledged: true,
        matchedCount: 1,
        modifiedCount: 1,
        upsertedCount: 0,
        upsertedId: null,
      };

      sinon.stub(Model, 'findById').resolves(dbOutput);
      const findByIdAndUpdateStub = sinon.stub(Model, 'findByIdAndUpdate').resolves(updatedResult);

      const service = new CarService();
      try {
        await service.update(id, bodyInput);
        // assert.deepStrictEqual(result, { id: '644ae581d5be6d62cc487471',  model: 'Marea', year: 2002,
        //   color: 'Yellow', status: true, buyValue: 15.99, doorsQty: 4, seatsQty: 5 });
        sinon.assert.calledOnce(findByIdAndUpdateStub);
        sinon.assert.calledWith(
          findByIdAndUpdateStub,
          { _id: id },
          {
            model: 'Marea',
            year: 2002,
            color: 'Yellow',
            status: true,
            buyValue: 15.99,
            doorsQty: 4,
            seatsQty: 5,
          },
          { new: true },
        );
      } catch (err: any) {
        assert.fail(err);
      }
    });
  });
});
