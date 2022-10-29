import express, {Router} from 'express';
import bodyParser from "body-parser";
import * as path from "path";
import {TodoAPI } from "./todo.js";

const app = express();

app.use(express.static("../client/dist"));
app.use(bodyParser.json());
app.use("/api/todo", TodoAPI());

app.use((req, res, next) => {
   if(req.method === "GET" && !req.path.startsWith("/api")) {
      res.sendFile(path.resolve("../client/dist/index.html"));
   } else {
      next();
   }
});

const server = app.listen(process.env.PORT || 3000, () => {
   console.log(`Started on http://localhost:${server.address().port}`);
});