import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { ApiError } from './errors/api-error';
import { userRouter } from './routers/user.router';
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);

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

const port = process.env.PORT;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
