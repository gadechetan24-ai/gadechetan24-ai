const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/mydatabase")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
  emailid: String,
  password: String,
  address: String
});


const User = mongoose.model("User", userSchema);


app.post('/login', async (req, res) => {
  const newUser = new User({
    emailid: req.body.emailid,
    password: req.body.password,
    address: req.body.address
  });

  await newUser.save();
  res.json(newUser);
});


app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Server
app.listen(5000, () => console.log("Server running on port 5000"));
