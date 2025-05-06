const passport = require("passport");

const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/M_user");

passport.serializeUser((user, done) => {
    done(null, user.id); // Lưu user._id của MongoDB
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});
// passport.use(
//     new GoogleStrategy(
//         {
//             clientID: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//             callbackURL: "http://localhost:9000/user/login/google/cb",
//         },
//         async (accessToken, refreshToken, profile, done) => {
//             try {
//                 const email = profile.emails[0].value;
//                 const existingUser = await User.findOne({ email });

//                 if (existingUser) {
//                     // Nếu user đã có googleId thì tiếp tục login
//                     if (!existingUser.googleId) {
//                         // Nếu trước đó đăng ký local, giờ login google -> cập nhật thông tin google
//                         existingUser.googleId = profile.id;
//                         existingUser.provider = "google";
//                         existingUser.avatar = profile.photos[0].value;
//                         await existingUser.save();
//                     }
//                     return done(null, existingUser);
//                 }

//                 // Nếu chưa có user, tạo mới
//                 const newUser = await User.create({
//                     name: profile.displayName,
//                     email: email,
//                     googleId: profile.id,
//                     avatar: profile.photos[0].value,
//                     provider: "google",
//                 });

//                 return done(null, newUser);
//             } catch (err) {
//                 return done(err, null);
//             }
//         }
//     )
// );

// passport.use(
//     new FacebookStrategy(
//         {
//             clientID: process.env.FACEBOOK_APP_ID,
//             clientSecret: process.env.FACEBOOK_APP_SECRET,
//             callbackURL: "http://localhost:9000/user/login/facebook/cb",
//             profileFields: ["id", "displayName", "photos", "email"],
//         },
//         async (accessToken, refreshToken, profile, done) => {
//             try {
//                 const email = profile.emails?.[0]?.value;
//                 const facebookId = profile.id;

//                 let user = await User.findOne({
//                     $or: [{ facebookId }, { email }],
//                 });

//                 if (user) {
//                     if (!user.facebookId) {
//                         user.facebookId = facebookId;
//                         user.provider = "facebook";
//                         user.avatar = profile.photos?.[0]?.value;
//                         await user.save();
//                         console.log(user);
//                     }
//                     return done(null, user);
//                 }

//                 const newUser = await User.create({
//                     name: profile.displayName,
//                     email: email || `fb_${facebookId}@noemail.com`,
//                     facebookId,
//                     avatar: profile.photos?.[0]?.value,
//                     provider: "facebook",
//                 });

//                 return done(null, newUser);
//             } catch (err) {
//                 return done(err, null);
//             }
//         }
//     )
// );

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:9000/user/login/google/cb",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails[0].value;
                const googleId = profile.id;

                let user = await User.findOne({
                    $or: [{ googleId }, { email }],
                });

                if (user) {
                    let updated = false;

                    if (!user.googleId) {
                        // console.log(1);
                        user.googleId = googleId;
                        updated = true;
                    }

                    if (user.provider !== "Oauth") {
                        // console.log(2);
                        user.provider = "Oauth";
                        updated = true;
                    }

                    if (updated) {
                        // console.log(3);
                        await user.save();
                    }
                    // console.log(4);

                    return done(null, user);
                }

                const newUser = await User.create({
                    name: profile.displayName,
                    email,
                    googleId,
                    avatar: profile.photos[0].value,
                    provider: "Oauth",
                });

                return done(null, newUser);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);

passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: "http://localhost:9000/user/login/facebook/cb",
            profileFields: ["id", "displayName", "photos", "email"],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails?.[0]?.value;
                const facebookId = profile.id;

                let user = await User.findOne({
                    $or: [{ facebookId }, { email }],
                });

                if (user) {
                    let updated = false;

                    if (!user.facebookId) {
                        user.facebookId = facebookId;
                        updated = true;
                    }

                    if (user.provider !== "Oauth") {
                        user.provider = "Oauth";
                        updated = true;
                    }

                    if (updated) {
                        await user.save();
                    }

                    return done(null, user);
                }

                // Nếu user chưa tồn tại, tạo mới
                const newUser = await User.create({
                    name: profile.displayName,
                    email: email || `fb_${facebookId}@noemail.com`,
                    facebookId,
                    avatar: profile.photos?.[0]?.value,
                    provider: "Oauth",
                });

                return done(null, newUser);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);

module.exports = passport;
