const express = require("express");
const app = express();
const mongoose = require("mongoose");

const connectDB = require("./config/db.js");
const cors = require("cors");

connectDB();

const User = require("./Model/User");
app.use(express.json());

app.use(cors());

app.post("/post", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    Address: req.body.Address,
    Phone: req.body.Phone,
  });
  user
    .save()
    .then((result) => {
      console.log(result);
      if (!result) {
        return res
          .status(400)
          .send({ success: false, message: "Cannot add user" });
      }
      res
        .status(200)
        .send({ success: true, message: "User successfully added" });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .send({ success: false, message: "Internal server error" });
    });
});

app.get("/alluser", async (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error fetching users", error });
    });
});
app.delete("/deleteallusers", async (req, res) => {
  try {
    await User.deleteMany();
    res.json({ success: true, message: "All users deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting users", error });
  }
});
app.delete("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting user", error });
  }
});
const { ObjectId } = require("bson");
app.put("/post/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    console.log(req.body);
    const objids = req.params.id;
    const objid = new ObjectId(objids);
    // const { name } = req.body;

    const ress = await User.findByIdAndUpdate(objid, {
      name: req.body.name,
      email: req.body.email,
      Address: req.body.Address,
      Phone: req.body.Phone,
    });
    console.log("responce", ress);
    // res.json({ success: true, message: "User name updated successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error updating user name", error });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`listening on port ${port}`));
