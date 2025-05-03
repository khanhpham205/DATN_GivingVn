const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phonenumber: { type: String },
  password: { type: String },

  role: {
    type: String,
    default: "user",
    enum: ["user", "adminlvl1", "admin"],
  },

  googleId: { type: String, unique: true, sparse: true },
  facebookId: { type: String, unique: true, sparse: true },
  avatar: { type: String },

  provider: {
    type: String,
    enum: ["local", "google", "facebook"],
    required: true,
  },
},
{ timestamps: true } 
);

// Băm mật khẩu nếu có
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
