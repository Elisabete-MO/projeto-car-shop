import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import IMoto from '../Interfaces/IMotorcycle';
import MotoService from '../Services/MotoService';

export default class MotoController { 
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotoService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotoService();
  }

  public async getAll() {
    try {
      const motos = await this.service.getAll();
      return this.res.status(200).json(motos);
    } catch (error) {
      this.next(error);
    }
  }

  public async getById() {
    const { id } = this.req.params;
    try {
      if (!isValidObjectId(id)) throw new Error('InvalidId');
      const moto = await this.service.getById(id);
      return this.res.status(200).json(moto);
    } catch (error) {
      this.next(error);
    }
  }

  public async create() {
    const moto: IMoto = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };

    try {
      const newMoto = await this.service.create(moto);
      return this.res.status(201).json(newMoto);
    } catch (error) {
      this.next(error);
    }
  }

  public async update() {
    const moto: IMoto = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };
    const { id } = this.req.params; 
    try {
      if (!isValidObjectId(id)) throw new Error('InvalidId');
      const upMoto = await this.service.update(id, moto);
      return this.res.status(200).json(upMoto);
    } catch (error) {
      this.next(error);
    }
  }
}