require("dotenv").config();
import http from "http";
import https from "https";
import fs from "fs";
import { Model } from "objection";

import app from "./app";
import { db } from "./db";

const PORT = process.env.PORT || 3031;

const start = async () => {
  Model.knex(db);
  if (process.env.NODE_ENV === "development") {
    http.createServer(app.callback()).listen(PORT, () => {
      console.log(`Listening on port ${PORT} in ${process.env.NODE_ENV} mode`);
    });
  } else {
    const options = {
      key: fs.readFileSync(process.env.KEY as string),
      cert: fs.readFileSync(process.env.CERT as string),
    };
    https.createServer(options, app.callback()).listen(PORT);
  }
};

start();
