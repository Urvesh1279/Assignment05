const express = require("express");
const routerAPI = express.Router();

const { routesTask } = require("./routesTask");

//send back sepcific Task
routerAPI.get("/Task/:id", routesTask.getSingletask);
routerAPI.get("/Task", routesTask.getAlltasks);
routerAPI.post("/Task", routesTask.createtask);
routerAPI.put("/Task/:id", routesTask.updatetask);
routerAPI.delete("/Task/:id", routesTask.deletetask);


routerAPI.all("*", (req, res, next) => {
  res.send({ error: "invalid api" });
});

module.exports.routerAPI = routerAPI;
