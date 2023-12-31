import express, { json, urlencoded } from "express";
import { RegisterRoutes } from "./routes";

export const app = express();

app.use('/swagger', express.static(__dirname + '/../src/swagger.json'));

// Use body parser to read sent json payloads
app.use(
  urlencoded({
    extended: true,
  })
);
app.use(json());

RegisterRoutes(app);
