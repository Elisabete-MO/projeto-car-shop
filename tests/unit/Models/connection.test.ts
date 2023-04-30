import mongoose from 'mongoose';
import sinon from 'sinon';
import { describe, afterEach } from 'mocha';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import connectToDatabase from '../../../src/Models/Connection';

chai.use(chaiAsPromised);

describe('connectToDatabase', function () {
  afterEach(() => {
    sinon.restore();
  });

  it('should connect to the database successfully', async function () {
    sinon.stub(mongoose, 'connect').resolves();

    await expect(connectToDatabase()).to.be.fulfilled;

    sinon.assert.calledOnce(sinon.stub(mongoose, 'connect'));
  });

  it('should throw an error if the connection fails', async function () {
    const errorMessage = 'Connection error';
    sinon.stub(mongoose, 'connect').rejects(new Error(errorMessage));

    await expect(connectToDatabase()).to.be.rejectedWith(errorMessage);

    sinon.assert.calledOnce(sinon.stub(mongoose, 'connect'));
  });
});
