const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    phonenumber: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default:'user'}
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next(); 
    } catch (err) {
        next(err);
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
