import express from 'express';
import errorMiddleware from './Middlewares/error.middleware';
import carRouter from './Routes/CarRoutes';

const app = express();
app.use(express.json());
app.use('/cars', carRouter);
app.use(errorMiddleware);

export default app;
