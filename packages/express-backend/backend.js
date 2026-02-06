import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import {
  getUsers,
  findUserByName,
  findUserByJob,
  findUsersByNameAndJob,
  findUserById,
  addUser,
  deleteUserById,
} from "./services/user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/usersdb")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Mongo connection error:", err));

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  if (name != undefined && job != undefined) {
    let resultQuery = findUsersByNameAndJob(name, job);
    resultQuery
      .then((users) => {
        let result = { users_list: users };
        res.send(result);
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  } else if (name != undefined) {
    let resultQuery = findUserByName(name);
    resultQuery
      .then((users) => {
        let result = { users_list: users };
        res.send(result);
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  } else if (job != undefined) {
    let resultQuery = findUserByJob(job);
    resultQuery
      .then((users) => {
        let result = { users_list: users };
        res.send(result);
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  } else {
    getUsers()
      .then((users) => res.send({ users_list: users }))
      .catch((err) => res.status(500).json({ error: err.message }));
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];

  findUserById(id)
    .then((result) => {
      if (result === null) return res.status(404).send("Resource not found.");
      return res.send(result);
    })
    .catch((err) => res.status(400).json({ error: err.message }));
});

app.post("/users", (req, res) => {
  const body = req.body;
  const newUser = { name: body.name, job: body.job };

  addUser(newUser)
    .then((created) => res.status(201).json(created))
    .catch((err) => res.status(400).json({ error: err.message }));
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  deleteUserById(id)
    .then((deleted) => {
      if (!deleted) return res.status(404).send("Resource not found.");
      return res.sendStatus(204);
    })
    .catch((err) => res.status(400).json({ error: err.message }));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
