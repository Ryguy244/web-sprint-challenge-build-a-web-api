const express = require("express");
const server = express();
const actionsRouter = require("../api/actions/actions-router");
const projectsRouter = require("../api/projects/projects-router");

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use(express.json());
server.use("/api/actions/actions-router", actionsRouter);
server.use("/api/actions/projects-router", actionsRouter);
module.exports = server;
