import * as sinon from 'sinon';
import * as chai from 'chai';
import { describe, afterEach } from 'mocha';
import chaiAsPromised from 'chai-as-promised';
import { Model } from 'mongoose';
import CarService from '../../../src/Services/CarService';
import MotoService from '../../../src/Services/MotoService';

chai.use(chaiAsPromised);

const { expect } = chai;

describe('Service', function () {
  afterEach(() => {
    sinon.restore();
  });

  describe('Fail Cases', function () {
    it('GET cars/ => throws a "NoCarsFound" Error', async function () {
      sinon.stub(Model, 'find').resolves(undefined);

      try {
        const service = new CarService();
        await service.getAll();
      } catch (error) {
        expect((error as Error).message).to.be.equal('NoCarsFound');
      }
    });

    it('GET motos/ => throws a "NoMotosFound" Error', async function () {
      sinon.stub(Model, 'find').resolves(undefined);

      try {
        const service = new MotoService();
        await service.getAll();
      } catch (error) {
        expect((error as Error).message).to.be.equal('NoMotosFound');
      }
    });
  });
});
