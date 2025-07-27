import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

const app = express();
app.use(express.json());
const client = new PrismaClient();

app.post("/signup", async (req: Request, res: Response) => {
  const { username, password, age, city } = req.body;

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await client.user.findUnique({
    where: {
      username: username,
    },
  });

  if (user) {
    res.status(400).json({
      message: "User already exists!",
    });
  }

  const newUser = await client.user.create({
    data: {
      username: username,
      password: hashPassword,
      age: age,
      city: city,
    },
  });

  res.status(201).json({
    user: newUser,
    message: "user signup successfully!",
  });
});

app.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await client.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return;
  }

  const decoded = await bcrypt.compare(password, user.password);

  if (!decoded) {
    res.status(400).json({
      message: "password is incorrect!",
    });
  }

  res.status(201).json({
    user: {
      id: user?.id,
      username: user?.username,
    },
    message: "user login successfully!",
  });
});

app.post("/todos", async (req: Request, res: Response)=> {
  const { title, description, done, userId } = req.body;

  if (!title || !description || typeof done !== "boolean" || !userId) {
    res.json({
      message: "something is missing!",
    });
  }

  const user = await client.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
     res.status(400).json({message:"User not found!"});
  }

  const newTodo = await client.todo.create({
    data: {
      title,
      description,
      done,
      userId,
    },
  });

   res.status(201).json({
    message: "Todo created successfully!",
    todo: newTodo,
  });
});
app.listen(5000);

