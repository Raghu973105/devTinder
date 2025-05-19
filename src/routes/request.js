const express = require("express");
const { userAuth } = require("../middlewares/auth");

const requestRouter = express.Router();

requestRouter.post("/sendConnecctionRequest", userAuth,  async (req,res) => {
    try {
    const user = req.user;
    // Sending a connection request
    console.log("Sending a connection request");
    res.send(user.firstName + "Sent the connection request!");
    }
    catch (err) {
        res.status(400).send("Error : " + err.message);
    }
});

module.exports = requestRouter;