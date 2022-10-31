import express from 'express';
import bodyParser from "body-parser";
import * as path from "path";
import {TodoAPI } from "./todo.js";
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const mongoClient = new MongoClient(process.env.MONGODB_URL);

mongoClient.connect().then(async res => {
   console.log('Connected do mongodb');
   const databases = await mongoClient.db().admin().listDatabases();

   app.use("/api/todo", TodoAPI(mongoClient.db("pg6103")));
});

app.use(express.static("../client/dist"));
app.use(bodyParser.json());

app.use((req, res, next) => {
   if(req.method === "GET" && !req.path.startsWith("/api")) {
      res.sendFile(path.resolve("../client/dist/index.html"));
   } else {
      next();
   }
});

const server = app.listen(process.env.PORT || 3000, async() => {
   console.log(`Started on http://localhost:${server.address().port}`);
});