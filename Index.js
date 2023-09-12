const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser')
const connectDB = require("./config/db.js");
const cors = require("cors");

app.use(cookieParser())

connectDB();



app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // Allow credentials (cookies, headers, etc.)
  })
);

const {login,adduser,post,alluser,deletealluser,deleteusingid,postusingid} =require("./controlers/controler")

  app.post("/log", login);

app.post("/adduser",adduser);

app.post("/post",post );

app.get("/alluser",alluser );
app.delete("/deleteallusers",deletealluser);
app.delete("/user/:id",deleteusingid );
app.put("/post/:id",postusingid );

const port = process.env.PORT || 3100;
app.listen(port, () => console.log(`listening on port ${port}`));
