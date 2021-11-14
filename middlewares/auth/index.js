const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { generateToken } = require("../../utils/jwt");
const { user } = require("../../models");

exports.Authentication = (req, res, next) => {
  /**
   * setelah ke middleware -> ke lokal strategy -> authenticate
   */
  passport.Authentication(
    "authentication",
    { session: false },
    (err, user, info) => {
      if (err) {
        return res.status(500).json({
          message: "Internal Server error",
          error: err.message,
        });
      }

      if (!user) {
        return res.status(401).json({
          message: info.message,
        });
      }

      req.loginUser = user;
      next();
    }
  )(req, res, next);
};

passport.use(
  "authentication",
  new LocalStrategy(
    {
      usernameField: "email", //usernameField didapatkan dari req.body.email
      passwordField: "password",
      passReqToCallback: true, // enable read req.body /req.params / req.query
    },
    async (req, email, password, done) => {
      try {
        const token = req.headers.access_token;
        console.log(token);
        const payload = generateToken(token);
        if (!token) {
          return done(null, false, {
            message: "Please Login",
          });
        }

        console.log(payload);

        const user = await User.findOne({
          where: {
            id: payload.id,
          },
        });

        if (!user) {
          return done(null, false, {
            message: "Please Login",
          });
        }

        return done(null, payload, {
          message: "Authenticate Success",
        });
      } catch (error) {
        console.log(error);
        return done(null, false, {
          message: "Something wrong",
        });
      }
    }
  )
);
