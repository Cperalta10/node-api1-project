// BUILD YOUR SERVER HERE
const express = require("express");
const server = express();
const profileModel = require("../api/users/model");

server.use(express.json());
// POST /api/users Creates a user using the information sent inside the `request body`.                                   |
server.post("/api/users", (req, res) => {
  let body = req.body;
  if (body.name == null) {
    res.status(400).json({ message: "provide name and bio" });
    return;
  }
  if (body.bio == null) {
    res.status(400).json({ message: "provide name and bio" });
    return;
  }
  profileModel.insert(body).then((people) => res.status(201).json(people));
});
// GET /api/users Returns an array users.                                                                                |
server.get("/api/users", (req, res) => {
  profileModel.find().then((result) => {
    res.json(result);
  });
});
// GET /api/users/:id Returns the user object with the specified `id`.                                                       |
server.get("/api/users/:id", (req, res) => {
  profileModel.findById(req.params.id).then((result) => {
    if (result == null) {
      res.status(404).json({ message: "does not exist" });
    } else {
      res.json(result);
    }
  });
});
// DELETE /api/users/:id Removes the user with the specified `id` and returns the deleted user.                                 |
server.delete("/api/users/:id", (req, res) => {
  profileModel
    .remove(req.params.id)
    .then((result) => {
      if (result == null) {
        res.status(404).json({ message: "does not exist" });
      } else {
        res.json(result);
      }
    })
    .catch(() => {
      res.status(500).json({ message: "something weird happened" });
    });
});
// PUT /api/users/:id Updates the user with the specified `id` using data from the `request body`. Returns the modified user |
server.put("/api/users/:id", (req, res) => {
  let body = req.body;
  if (body.name == null) {
    res.status(400).json({ message: "provide name and bio" });
    return;
  }
  if (body.bio == null) {
    res.status(400).json({ message: "provide name and bio" });
    return;
  }
  profileModel
    .update(req.params.id, req.body)
    .then((result) => {
      if (result == null) {
        res.status(404).json({ message: "does not exist" });
      } else {
        res.json(result);
      }
    })
    .catch(() => {
      res.status(500).json({ message: "something weird happened" });
    });
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
