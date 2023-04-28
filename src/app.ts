import express from 'express';
import errorMiddleware from './Middlewares/error.middleware';
import carRouter from './Routes/CarRoutes';
import motoRouter from './Routes/MotoRoutes';

const app = express();
app.use(express.json());
app.use('/cars', carRouter);
app.use('/motorcycles', motoRouter);
app.use(errorMiddleware);

export default app;
