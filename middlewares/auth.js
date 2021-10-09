const expressJwt = require("express-jwt");

exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.isOwner = (req, res, next) => {
  const checker = req.auth.role === "owner";
  if (!process.env.PRODUCTION) console.log(checker, "owner");
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED (only owner allowed)",
    });
  }
  next();
};

exports.isAuthenticated = (req, res, next) => {
  const checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};
