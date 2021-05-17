// Write your "projects" router here!!!!

const express = require("express");
const Projects = require("./projects-model");
const router = express.Router();

router.get("/", (req, res) => {
  Projects.find(req.query)
    .then((project) => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(200).json({});
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "The projects information could not be retrieved",
      });
    });
});

router.get("/:id", (req, res) => {
  Projects.findById(req.params.id).then((project) => {
    if (project) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ message: "The project with the specified ID does not exist" });
    }
  });
});

router.post("/", (req, res) => {
  Projects.insert(req.body)
    .then((project) => {
      if (
        !req.body.id ||
        !req.body.name ||
        !req.body.description ||
        !req.body.completed
      ) {
        res.status(400);
      } else {
        res.status(201).json(project);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "There was an error while saving the project to the database",
      });
    });
});

router.put("/:id", (req, res) => {
  Projects.update(req.body, req.params.id)
    .then((project) => {
      if (!req.params.id) {
        res.status(404).json({
          message: "The project with the specified ID does not exist",
        });
      } else if (
        !req.body.name ||
        !req.body.description ||
        !req.body.completed
      ) {
        res
          .status(400)
          .json({ message: "Please provide title and contents for the post" });
      } else {
        res.status(200).json(project);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "There was an error while saving the project to the database",
      });
    });
});

router.delete("/:id", (res, req) => {
  Projects.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: "It's gone!" });
      } else {
        res
          .status(404)
          .json({ message: "The project with the specific ID does not exist" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "The project could not be removed" });
    });
});

router.get("/:id/actions", (req, res) => {
  Projects.findById(req.params.id).then((project) => {
    if (project) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ message: "The project with the specified ID does not exist" });
    }
  });
});

module.exports = router;
