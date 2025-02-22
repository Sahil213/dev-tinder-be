const express = require("express");
const connectDB = require("./config/database");
const app = express();
const port = 3000;
const User = require("./models/user");

app.use(express.json());
app.post("/signup", async (req, res) => {
  // Craete a new user instance
  console.log(req.body);
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User Created");
  } catch (err) {
    res.status(400).send(err.message);
  }
});
// Find API - GEt/ feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    console.log(req.params);
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.patch("/update/:id", async (req, res) => {  
  try {
    console.log(req.params);
    const user = await User.findByIdAndUpdate(req.params.id
    , req.body, {new: true, runValidators: true});    
    if (!user) {
      return res.status(404).send("User not found");
    } 
    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }   
});

connectDB()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

  