import mongoose from 'mongoose';
import sinon from 'sinon';
import { describe, afterEach, beforeEach } from 'mocha';
import { assert } from 'chai';
// import chaiAsPromised from 'chai-as-promised';
import connectToDatabase from '../../../src/Models/Connection';

// chai.use(chaiAsPromised);

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
    try {
      await connectToDatabase();
      sinon.assert.calledOnce(connectStub);
    } catch (err) {
      assert.fail(typeof err === 'string' ? err : JSON.stringify(err));
    }
  });

  it('should throw an error if the connection fails', async function () {
    const errorMessage = 'Connection error';
    connectStub.rejects(new Error(errorMessage));
    try {
      await connectToDatabase();
      assert.fail('Expected error was not thrown');
    } catch (err: any) {
      assert.strictEqual(err.message, errorMessage);
      sinon.assert.calledOnce(connectStub);
    }
  });
});
