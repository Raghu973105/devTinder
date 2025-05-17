const express = require('express');
const connectDB =  require("./config/database");
const User = require('./models/user');
const app = express();
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req,res) => {
    try {
    // Validation of data
    validateSignUpData(req);
    const { firstName,lastName,emailId,password} = req.body;
    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    // creating a new instance of the user model
    const user = new User ({
        firstName,lastName,emailId,password: passwordHash,
    });
        await user.save();
        res.send("user added successfully");
    } catch (err) {
        res.status(400).send("Error : " + err.message);
    }
});

app.post("/login", async (req,res) => {
    try {
      const { emailId, password } = req.body;
      
      const user = await User.findOne({ emailId: emailId});
      if (!user) {
        throw new Error("Invalid Credentials");
      }
      const isPasswordValid = await user.validatePassword(password);
      if (isPasswordValid) {
        //create a JWT Token
        const token = await user.getJWT();
        // Add the token to cookie and send the response back to the user
        res.cookie("token", token, {
            expires: new Date(Date.now() + 8 * 3600000),
        });
        res.send("Login Successful!!")
      }
      else {
        throw new Error("Invalid Credentials");
      }
    } catch (err) {
        res.status(400).send("Error : " + err.message);
    }
});

app.get("/profile", userAuth, async (req,res) => {
    try {

    const user = req.user;
    res.send(user);}
    catch (err) {
        res.status(400).send("Error : " + err.message);
    }
});

app.post("/sendConnecctionRequest", userAuth,  async (req,res) => {
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

connectDB().then(() => {
    console.log("Database connection established...");
    app.listen(3000, () =>{
        console.log("Server Started");
    });
}).catch(err => {
    console.log("Database cannot be connected!!");
    console.log(err);
})


