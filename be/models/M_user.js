const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
    {
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
            enum: ["local", "Oauth"],
            required: true,
        },

        flag:                   { type: Boolean, default: false, required: true },
        verification_status:    { type: Number, default: 0, require: true },

        dt_front_cccd:          { type: String },
        dt_back_cccd:           { type: String },
        dt_vid:                 { type: String },

        info_cccdId:            { type: String },
        info_name:              { type: String },
        info_DateOfBirth:       { type: String },
        info_sex:               { type: String },
        info_nationality:       { type: String },
        info_home:              { type: String },
        info_address:           { type: String },
        info_DateOfExpire:      { type: String },
        info_Features:          { type: String },
        info_IssueDate:         { type: String }, //ngay lam cccd
        info_IssueLocation:     { type: String },
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
