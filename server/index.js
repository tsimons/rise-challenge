const express = require("express");
const morgan = require("morgan");
const { json } = require("body-parser");

const connectoToMongo = require("./lib/db");
const routes = require("./routes");

function server() {
  const app = express();
  const port = process.env.PORT || 3001;

  app.use(morgan("dev"));
  app.use(json());

  app.use("/api", routes);

  app.start = async () =>
    connectoToMongo().then(
      app.listen.bind(app, port, () => console.log(`Listening on port ${port}`))
    );

  return app;
}

if (require.main === module) server().start();

module.exports = server;
