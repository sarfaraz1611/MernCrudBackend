const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

const connectDB = require("./config/db.js");
const cors = require("cors");
const { ObjectId } = require("bson");

connectDB();

const User = require("./Model/User");
const Login = require("./Model/Login.js");

app.use(express.json());

app.use(cors());

app.post("/log", async (req, res) => {
  // console.log(req.body);
  const { Email, Password } = req.body;
  // console.log(Email, Password);
  try {
    const LoginUser = await Login.findOne({ email: Email });

    if (!LoginUser) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(LoginUser.password);

    const isMatch = await bcrypt.compare(Password, LoginUser.password);
    console.log(isMatch);
    console.log(Password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/adduser", async (req, res) => {
  const existingUser = await Login.findOne({ email: req.body.email });

  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  } else {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const reqsponsce = await Login.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
      res.status(200).send({ success: true, message: reqsponsce });
    } catch (e) {
      res.status(500).send({ success: false, message: e });
    }
  }
});

app.post("/post", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    Address: req.body.Address,
    Phone: req.body.Phone,
  });
  console.log(user);
  try {
    const response = await user.save();

    // console.log(result);

    res.status(200).send({ success: true, message: "User successfully added" });
  } catch {
    (error) => {
      // console.log(error);
      res
        .status(500)
        .send({ success: false, message: "Internal server error" });
    };
  }
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

const port = process.env.PORT || 3100;
app.listen(port, () => console.log(`listening on port ${port}`));
