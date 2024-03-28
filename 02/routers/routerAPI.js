const express = require("express");
const routerAPI = express.Router();

const { routesproduct } = require("./routesproduct");

//send back sepcific user
routerAPI.get("/product/:id", routesproduct.getSingleproduct);
routerAPI.get("/product", routesproduct.getAllproducts);
routerAPI.post("/product", routesproduct.createproduct);
routerAPI.put("/product/:id", routesproduct.updateproduct);
routerAPI.delete("/product/:id", routesproduct.deleteproduct);

routerAPI.all("*", (req, res, next) => {
  res.send({ error: "invalid api" });
});

module.exports.routerAPI = routerAPI;
