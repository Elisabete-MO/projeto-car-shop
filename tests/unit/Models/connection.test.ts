import mongoose from 'mongoose';
import sinon from 'sinon';
import { describe, afterEach, beforeEach } from 'mocha';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import connectToDatabase from '../../../src/Models/Connection';

chai.use(chaiAsPromised);

describe('connectToDatabase', function () {
  let connectStub: sinon.SinonStub;

  beforeEach(() => {
    connectStub = sinon.stub(mongoose, 'connect');
  });

  afterEach(() => {
    connectStub.restore();
  });

  it('should connect to the database successfully', async function () {
    connectStub.resolves();

    await expect(connectToDatabase()).to.be.fulfilled;

    sinon.assert.calledOnce(connectStub);
  });

  it('should throw an error if the connection fails', async function () {
    const errorMessage = 'Connection error';
    connectStub.rejects(new Error(errorMessage));

    await expect(connectToDatabase()).to.be.rejectedWith(errorMessage);

    sinon.assert.calledOnce(connectStub);
  });
});
