// backend.js
import express from "express";
import cors from "cors";

const users = {
  users_list: [
    { id: "xyz789", name: "Charlie", job: "Janitor" },
    { id: "abc123", name: "Mac", job: "Bouncer" },
    { id: "ppp222", name: "Mac", job: "Professor" },
    { id: "yat999", name: "Dee", job: "Aspring actress" },
    { id: "zap555", name: "Dennis", job: "Bartender" },
    { id: "qwe123", job: "Zookeeper", name: "Cindy" }
  ]
};

const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

const findUserByNameAndJob = (name, job) => {
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job
  );
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

const deleteUserById = (id) => {
  const index = users.users_list.findIndex((user) => user.id === id);
  if (index === -1) return false;
  users.users_list.splice(index, 1);
  return true;
};

const generateId = () => Math.random().toString(36).substring(2, 8);

const createUser = (body) => {
  let id = generateId();
  while (findUserById(id)) id = generateId();
  return { id, name: body.name, job: body.job };
};

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  if (name != undefined && job != undefined) {
    let result = findUserByNameAndJob(name, job);
    result = { users_list: result };
    res.send(result);
  } else if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];
  const result = findUserById(id);

  if (result === undefined) return res.status(404).send("Resource not found.");
  return res.send(result);
});

app.post("/users", (req, res) => {
  const newUser = createUser(req.body);
  addUser(newUser);
  return res.status(201).json(newUser);
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const deleted = deleteUserById(id);

  if (!deleted) return res.status(404).send("Resource not found.");
  return res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
