const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes.js");
const mongoose = require("mongoose");
const app = express();

app.use(cors());

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/netflix-clone", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Db connected");
  });

app.use("/api/user", userRoutes);

app.listen(5000, console.log("server started"));
