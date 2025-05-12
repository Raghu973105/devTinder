const express = require('express');

const app = express();

// this will only handle GET call to /users/
app.get("/user", (req, res) => {
    res.send({ firstName: "Raghu", lastName: "Software Developer"});
});

// this will match all the HTTP API calls ti /test
app.use((req, res) => {
    res.send("Hello from server");
});

app.listen(3000, () =>{
    console.log("Server Started");
});

