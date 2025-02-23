const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignore", "interested"];
      if (!allowedStatus.includes(status)) {
        throw new Error("Invalid status");
      }

      // check fromUserId and toUseid are same
      // check touserId is valid or not
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        throw new Error("User not found");
      }
      // If there is an existing ConnectionRequest
      const existingRequest = await ConnectionRequestModel.findOne({
        fromUserId,
        toUserId,
      });
      if (existingRequest) {
        throw new Error("Request already sent");
      }

      const connectionRequest = new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();

      res.json({
        message:
          req.user.firstName + "is " + status + " in " + toUser.firstName,
        data,
      });
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const requestId = req.params.requestId;
      const status = req.params.status;
      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        throw new Error("Invalid status");
      }
      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "intersted",
      });

      if (!connectionRequest) {
        throw new Error("Request not found");
      }

      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.json({
        message: "Request " + status,
        data,
      });
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
);

module.exports = requestRouter;
