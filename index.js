require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes.js");
const mongoose = require("mongoose");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");

app.use(cors());

app.use(express.json());

const uri = process.env.DB_URL;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Db connected");
  });

app.use("/api/user", userRoutes);

app.listen(5000, console.log("server started"));
