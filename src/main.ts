import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { read } from './fs.service';
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/users', async (req: Request, res: Response): Promise<void> => {
       try {
           const users = await read();
           res.json(users);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// app.post("/users", async (req: Request, res: Response): Promise<void> => {
//   try {
//     const users = await read();
//     const newUser = {
//       id: users.length ? users[users.length - 1].id + 1 : 1,
//       name: req.body.name,
//       email: req.body.email,
//       password: req.body.password,
//     };
//     users.push(newUser);
//     await write(users);
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).json({ message: "Error creating user" });
//   }
// });
// app.get("/users/:userId", async (req: Request, res: Response): Promise<void> => {
//   try {
//     console.log("PARAMS", req.params);
//     console.log("QUERY", req.query);
//     console.log("BODY", req.body);
//     const users = await read();
//     const user = users.find((user) => user.id === +req.params.userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: "Error reading user" });
//   }
// });
// app.patch("/users/:userId", async (req: Request, res: Response): Promise<void> => {
//   try {
//     const users = await read();
//     const user = users.find((user) => user.id === +req.params.userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     user.name = req.body.name || user.name;

//     if (req.body.email) {
//       if (!req.body.email.includes("@")) {
//         return res.status(400).json({ message: "Invalid email format" });
//       }
//       if (users.some((u) => u.email === req.body.email && u.id !== user.id)) {
//         return res.status(409).json({ message: "Email already exists" });
//       }
//       user.email = req.body.email;
//     }

//     if (req.body.password) {
//       if (req.body.password.length < 4) {
//         return res
//           .status(400)
//           .json({ message: "Password must be at least 4 characters long" });
//       }
//       user.password = req.body.password;
//     }

//     await write(users);
//     res.json(user);
//   } catch (error) {
//     console.error("Error during update:", error);
//     res
//       .status(500)
//       .json({ message: "Error updating user", error: error.message });
//   }
// });
// app.delete("/users/:userID", async (req: Request, res: Response): Promise<void> => {
//   try {
//     const users = await read();
//     console.log(users);
//     const index = users.findIndex((user) => user.id === +req.params.userID);
//     if (index === -1) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     users.splice(index, 1);
//     await write(users);
//     res.json({ message: "User deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting user" });
//   }
// });

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
