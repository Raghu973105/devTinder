
const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validator(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email Address: " + value );
            }
        },
    },
    password: {
        type: String,
        required: true,
        validator(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Enter a Strong Password: " + value );
            }
        },
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value) {
            if(!["male","female","others"].includes(this.value)){
                throw new Error("Gender data is not valid");
            }
        },
    },
    photoUrl: {
        type: String,
        default: "https://i.sstatic.net/l60Hf.png",
        validator(value) {
            if (!validator.isURL(value)) {
                throw new Error("Invalid Photo URL: " + value );
            }
        },
    },
    about: {
        type: String,
        default: "This is the default about the user!"
    },
    skills: {
        type: [String],
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);

