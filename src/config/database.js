const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://namastedev:Na0iiroPkvbZfQNG@namastenode.8fuqblo.mongodb.net/devTinder"
    ); 
};

module.exports = connectDB;




