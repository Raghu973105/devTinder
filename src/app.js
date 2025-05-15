const express = require('express');
const connectDB =  require("./config/database");
const User = require('./models/user');
const app = express();

app.use(express.json());

app.post("/signup", async (req,res) => {
    // creating a new instance of the user model
    const user = new User (req.body);

    try {
        await user.save();
        res.send("user added successfully");
    } catch (err) {
        res.status(400).send("Error saving the user:" + err.message);
    }
});

// Get user by email
app.get("/user", async (req,res) => {
    const userEmail = req.body.emailId;

    try{
        const users = await User.find({ emailId: userEmail});
        if(users.length === 0) {
            res.status(404).send("User not found");
        }
        else {
         res.send(users)
        }
    }
    catch (err) {
        res.status(400).send("Something went wrong")
    }
});

// Feed API - GET /feed - get all the users from the database
app.get("/feed", async (req,res) => {

    try {
        const users = await User.find({});
        res.send(users);
    }
    catch (err) {
        res.status(400).send("Something went wrong")
    }
});

//Delete a user from database
app.delete("/user", async (req,res) => {
    const userId = req.body.userId;
    try{
        //const user = await User.findByIdAndDelete({_id: userId});
        const user = await User.findByIdAndDelete(userId);
        res.send("User Deleted Successfully");
    }
    catch (err){
        res.status(400).send("Something went wrong");
    }
});

//Update data of the user
app.patch("/user/:userId", async (req,res) => {
    const userId = req.params?.userId;
    const data = req.body;
    try{
    const  ALLOWED_UPDATES = ["userId","photoUrl","about","gender","age","skills"];
    const isUpdateAllowed = Object.keys(data).every((k) => 
        ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
        throw new Error("update not allowed");
    }
    if (data?.skills.length > 10) {
        throw new Error ("Skills cannot e more than 10");
    }
        //const user = await User.findByIdAndDelete({_id: userId});
        const user = await User.findByIdAndUpdate({_id: userId}, data, {
            returnDocument: "after",
            runValidators: true,
        });
        res.send("User Updated Successfully");
    }
    catch (err){
        res.status(400).send("Update Failed:" + err.message);
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


