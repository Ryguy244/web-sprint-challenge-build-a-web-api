// Write your "actions" router here!

const express = require("express");

const Actions = require("./actions-model");

const router = express.Router();

router.get("/", (req, res) => {
  Actions.find(req.query).then((action) => {
    res.status(200).json(action);
  });
});

router.get("/:id", (req, res) => {
  Actions.findById(req.params.id).then((action) => {
    if (action) {
      res.status(200).json(action);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    }
  });
});

router.post("/", (req, res) => {
  Actions.insert(req.body)
    .then((action) => {
      if (
        !req.body.id ||
        !req.body.project_id ||
        !req.body.description ||
        !req.body.notes ||
        !req.body.completed
      ) {
        res
          .status(400)
          .json({ message: "Please provide everything needed for the action" });
      } else {
        res.status(201).json(action);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "There was an error while saving the action to the database",
      });
    });
});

router.put("/:id", (req, res) => {
  Actions.update(req.body, req.params.id)
    .then((action) => {
      if (!req.params.id) {
        res.status(404).json({
          message: "The action with the specified ID does not exist",
        });
      } else if (
        !req.body.project_id ||
        !req.body.description ||
        !req.body.notes ||
        !req.body.completed
      ) {
        res
          .status(400)
          .json({ message: "Please provide everything needed for the action" });
      } else {
        res.status(200).json(action);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "There was an error while saving the action to the database",
      });
    });
});

router.delete("/:id", (res, req) => {
  Actions.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: "It's gone!" });
      } else {
        res
          .status(404)
          .json({ message: "The action with the specific ID does not exist" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "The project could not be removed" });
    });
});

module.exports = router;
