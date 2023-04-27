import * as sinon from 'sinon';
import * as chai from 'chai';
import { beforeEach, describe, afterEach } from 'mocha';
import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai';
import { NextFunction, Request, Response } from 'express';
import errorMiddleware from '../../../src/Middlewares/error.middleware';

const { expect } = chai;

chai.use(chaiAsPromised);
chai.use(sinonChai);

describe('Error middleware', () => {
  const request = {} as Request;
  const response = {} as Response;

  beforeEach(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns(response);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('when called with the error "NoCarsFound"', () => {
    it('return status 404 return message "No cars found"', async function () {
      const nextFunction = sinon.spy() as NextFunction;
      await errorMiddleware({ message: 'NoCarsFound' }, request, response, nextFunction);
      expect(response.status).to.have.been.calledOnceWith(404);
      expect(response.json).to.have.been.calledWith({
        message: 'No cars found',
      });
    });
  });

  describe('when called with the error "CarNotFound"', () => {
    it('return status 404 return message "Car not found"', async function () {
      const nextFunction = sinon.spy() as NextFunction;
      await errorMiddleware({ message: 'CarNotFound' }, request, response, nextFunction);
      expect(response.status).to.have.been.calledWith(404);
      expect(response.json).to.have.been.calledWith({
        message: 'Car not found',
      });
    });
  });

  describe('when called with the error "InvalidId"', () => {
    it('return status 422 return message "Invalid mongo id"', async function () {
      const nextFunction = sinon.spy() as NextFunction;
      await errorMiddleware({ message: 'InvalidId' }, request, response, nextFunction);
      expect(response.status).to.have.been.calledWith(422);
      expect(response.json).to.have.been.calledWith({
        message: 'Invalid mongo id',
      });
    });
  });

  describe('when called with a not mapped error', () => {
    it('return status 500 and message "Internal Server Error"', async function () {
      const nextFunction = sinon.spy() as NextFunction;
      await errorMiddleware({ message: 'Any error' }, request, response, nextFunction);
      expect(response.status).to.have.been.calledWith(500);
      expect(response.json).to.have.been.calledWith({
        message: 'Internal Server Error',
      });
    });
  });
});