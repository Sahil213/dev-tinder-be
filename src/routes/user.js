const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const userRouter = express.Router();

// get all the pending connection request for the loggedIn user
userRouter.get("/user/requests", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectinRequest = await ConnectionRequestModel.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", ["firstName", "lastName"]);
    res.json({ message: "Data fetched successfully", data: connectinRequest });
  } catch (err) {
    res.status(500).send(err.message);
  }

  res.send(`Requests route for ${loggedInUser.username}`);
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  const loggedInUser = req.user;
  const request = await ConnectionRequest.findOne({
    $or: [
      { toUserId: loggedInUser._id, status: "accepted" },
      { fromuserId: loggedInUser._id, status: "accepted" },
    ],
  }).populate("fromUserId", ["firstName", "lastName"]);
  if (!request) {
    return res.status(404).send("Request not found");
  }
  const data = ConnectionRequest.map((row) => {
    row.fromuserId;
  });
  res.json({ message: "Data fetched successfully", data });
});

module.exports = userRouter;
