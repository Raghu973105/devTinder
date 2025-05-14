const express = require('express');
const connectDB =  require("./config/database");
const User = require('./models/user');
const app = express();

app.post("/signup", async (req,res) => {
    // creating a new instance of the user model
    const user = new User ({
        firstName: "Virat",
        lastName: "Kholi",
        emailId: "vk@gmail.com",
        password: "vk@123"

    });

    try {
        await user.save();
        res.send("user added successfully");
    } catch (err) {
        res.status(400).send("Error saving the user:" + err.message);
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


