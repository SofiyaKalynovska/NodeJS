import express, { NextFunction, Request, Response } from 'express';
import { userRouter } from './routers/user.router';
import { config } from './configs/config';
import mongoose from 'mongoose';
import { taskRouter } from './routers/task.router';
import { ApiError } from './errors/api-error';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('/tasks', taskRouter);

app.use(
  '*',
  // eslint-disable-next-line no-unused-vars
  (error: ApiError, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status ?? 500).json({ status: error.status, error: error.message });
  }
);


process.on ('uncaughtException', (error) =>{
  console.error('Uncaught exception', error);
  process.exit(1);
});


app.listen(config.port, async () => {
  await mongoose.connect(config.mongoUri);
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${config.port}`);
});
