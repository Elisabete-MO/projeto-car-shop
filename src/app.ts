import express from 'express';
import http from 'http';
import errorMiddleware from './Middlewares/error.middleware';
import carRouter from './Routes/car.router';

class App {
  public app: express.Express;
  private server: http.Server;

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);

    this.config();
    this.routes();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  private routes(): void {
    this.app.use(carRouter);
    this.app.use(errorMiddleware);
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
