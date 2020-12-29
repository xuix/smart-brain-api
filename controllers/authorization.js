//this is the authorization middleware.
//the redisClient should probably taken out of ./signin and put in its own file

const redisClient = require("./signin").redisClient;

const requireAuth = (req, res, next) => {
  const { authorization } = req.headers;
  console.log("### in requireAuth Middleware");

  if (!authorization) {
    console.log("### in requireAuth Middleware no authorizaion");
    return res.status(401).json("not authorised");
  }

  return redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      console.log("### in requireAuth Middleware redisClient failed");

      return res.status(401).json("not authorised from redis call");
    } else {
      console.log("authorization middleware passed");
      return next();
    }
  });
};

module.exports = {
  requireAuth: requireAuth,
};
