import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { ApiError } from './errors/api-error';
import { userRouter } from './routers/user.router';
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);

// app.get(
//   '/users',
//   async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//       const users = await read();
//       res.json(users);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// app.post(
//   '/users',
//   async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//       const users = await read();
//       const newUser = {
//         id: users.length ? users[users.length - 1].id + 1 : 1,
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password,
//       };
//       users.push(newUser);
//       await write(users);
//       res.status(201).json(newUser);
//     } catch (error) {
//       next(error);
//     }
//   }
// );
// app.get(
//   '/users/:userId',
//   async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//       const users = await read();
//       const user = users.find((user) => user.id === +req.params.userId);
//       if (!user) {
//         throw new ApiError('User not found', 404);
//       }
//       res.json(user);
//     } catch (error) {
//       next(error);
//     }
//   }
// );
// app.patch(
//   '/users/:userId',
//   async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//       const users = await read();
//       const user = users.find((user) => user.id === +req.params.userId);
//       if (!user) {
//         throw new ApiError('User not found', 404);
//       }

//       user.name = req.body.name || user.name;

//       if (req.body.email) {
//         if (!req.body.email.includes('@')) {
//           throw new ApiError('Invalid email format', 400);
//         }
//         if (users.some((u) => u.email === req.body.email && u.id !== user.id)) {
//           throw new ApiError('Email already exists', 403);
//         }
//         user.email = req.body.email;
//       }

//       if (req.body.password) {
//         if (req.body.password.length < 4) {
//           throw new ApiError(
//             'Password must be at least 4 characters long',
//             400
//           );
//         }
//         user.password = req.body.password;
//       }

//       await write(users);
//       res.json(user);
//     } catch (error) {
//       next(error);
//     }
//   }
// );
// app.delete(
//   '/users/:userID',
//   async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//       const users = await read();
//       const index = users.findIndex((user) => user.id === +req.params.userID);
//       if (index === -1) {
//         throw new ApiError('User not found', 404);
//       }
//       users.splice(index, 1);
//       await write(users);
//       res.json({ message: 'User deleted successfully' });
//     } catch (error) {
//       next(error);
//     }
//   }
// );

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
