import "reflect-metadata";
import express, { Request, Response } from "express";
import { DataSource } from "typeorm";
import { User } from "./entities/user";
const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  console.log("Hello");
});

app.get("/all", async (req: Request, res: Response) => {
  const userRepo = MyDataS.getRepository(User);
  const allData = await userRepo.find();
  res.json(allData);
});

app.post("/add", async (req: Request, res: Response) => {
  const userRepo = MyDataS.getRepository(User);
  const email = req.body.email;
  let myUser: User = new User();
  myUser.email = email;
  const objI = await userRepo.save(myUser);
  res.json(objI);
});

app.delete("/remove/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const userRepo = MyDataS.getRepository(User);
  await userRepo.delete(id);
  res.send("Deleted");
});

app.patch("/update", async (req: Request, res: Response) => {
  const userRepo = MyDataS.getRepository(User);
  const prevEmail = req.body.emailOld;
  const newEmail = req.body.emailNew;
  const updated = await userRepo.findOne({ where: { email: prevEmail } });
  if (updated) {
    updated.email = newEmail;
    const updatedObj = await userRepo.save(updated);
    res.json(updatedObj);
  } else {
    res.send("Not Found");
  }
});

const MyDataS = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "postgres",
  entities: ["src/entities/*{.ts,.js}"],
  synchronize: true,
  logging: true,
});

MyDataS.initialize()
  .then(() => {
    console.log("Connected");
    app.listen(3001, () => {
      console.log("listen");
    });
  })
  .catch((err) => console.log(err));
