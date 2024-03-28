const { appConfig } = require("./package.json");
const express = require("express");
const { getDBConnection } = require("./utils");
const chalk = require("chalk");
//middlewars
const { requestLogger } = require("./middlewares/requestLogger");
//routers
const { routerAPI } = require("./routers/routerAPI");
const bodyParser = require("body-parser");

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.set("view engine", "pug");


app.use(requestLogger);

app.use("/api", routerAPI);


getDBConnection()
  .then((productmangement) => {
    console.log(chalk.green("[+]DB is Connected"));
    app.listen(appConfig.port, () => {
      console.log(chalk.green(`[+]App is Running on Port ${appConfig.port}`));
    });
  })
  .catch((e) => {
    console.log(chalk.red(`[-]DB Connection Failed ${e}`));
  });
