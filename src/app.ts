import "reflect-metadata";
import express, { Request, Response } from "express";
import { DataSource, Like } from "typeorm";
import { User } from "./entities/user";
import { Profile } from "./entities/profile";
import { Post } from "./entities/post";
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

app.post("/create", async (req: Request, res: Response) => {
  const muser = MyDataS.getRepository(User);
  const user = new User();
  const profile = new Profile();
  profile.description = "First abc Profile";
  user.email = "abc11@email.com";
  user.profile = profile;
  const data = await muser.save(user);
  res.json(data);
});

app.get("/read", async (req: Request, res: Response) => {
  const muser = MyDataS.getRepository(User);
  const data = await muser.findOne({ where: { email: "abc11@email.com" } });
  res.json(data);
});

app.get("/readP", async (req: Request, res: Response) => {
  const mprofile = MyDataS.getRepository(Profile);
  const data = await mprofile.find({ relations: { user: true } });
  res.json(data);
});

app.post("/createX", async (req: Request, res: Response) => {
  const muser = MyDataS.getRepository(User);
  const user = new User();
  const profile = new Profile();
  const post1 = new Post();
  const post2 = new Post();

  post1.postText = "First Post";
  post2.postText = "Second Post";

  profile.description = "I am Profile of saadaziz0014@email.com";

  user.email = "saadaziz0014@email.com";
  user.profile = profile;
  user.post = [post1, post2];

  const data = await muser.save(user);

  res.json(data);
});

app.get("/readFilter", async (req: Request, res: Response) => {
  const mpost = MyDataS.getRepository(Post);
  const data = await mpost.find({ where: { postText: Like("%Post%") } });
  res.json(data);
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
