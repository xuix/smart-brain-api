const jwt = require("jsonwebtoken");
const { token } = require("morgan");
const redis = require("redis");
// setup Redis
// process.env.REDIS_URL from docker.copose.yml file
const redisClient = redis.createClient(process.env.REDIS_URL);

const signinAuthentication = (db, bcrypt) => (req, res) => {
  const { authorization } = req.headers;
  console.log("in signinauthentication", authorization);

  return authorization
    ? getAuthTokenId(req, res)
    : handleSignin(req, res, db, bcrypt)
        .then((data) => {
          console.log("###authDATA Data=", data);
          return data.id && data.email
            ? createSession(data)
            : Promise.reject("id or email not present" + data);
          res.json(data);
        })
        .then((session) => res.json(session))
        .catch((err) => {
          console.log("###authDATA catch=", err);
          res.status("400").json(err);
        });
};

const handleSignin = (req, res, db, bcrypt) => {
  // handlesignin is a sub function. Don't want this returning directly
  // so instead of response set Promise.reject
  let validated = false;
  console.log("##Signing In", req.body.email, req.body.password);

  //  else {res.status('400').json('error signing in')}
  const { email, password } = req.body;
  if (!email || !password) {
    return Promise.reject("no blank fields");
  }

  return db("login")
    .select("hash")
    .where({ email })
    .then((data) => {
      console.log("hash=", data);
      if (!data.length) {
        return Promise.reject("user not found");
      }
      validated = bcrypt.compareSync(password, data[0].hash, password);
      // validated = false;
      if (!validated) {
        return Promise.reject("wrong password.");
      } else {
        return selectUser(req, res, db)
          .then((user) => {
            console.log("###user select= ", user);
            return user;
          })
          .catch((err) => Promise.reject(err));
      }
    })
    .catch((err) => Promise.reject("1not found in login table" + err));
};

const selectUser = (req, res, db) => {
  const { email } = req.body;
  //const email = "xx";

  console.log("## in signin select user", email);
  return db("users")
    .select("*")
    .where({ email })
    .then((user) => {
      if (user.length > 0) {
        console.log("selected user>= ", user[0]);
        return user[0];
      } else {
        console.log("####user not found else");
        return Promise.reject("user not found111");
      }
    })
    .catch((err) => {
      console.log("##last catch executed", err);
      return Promise.reject("##error selecting from users" + err);
    });
};
const getAuthTokenId = (req, res) => {
  console.log("getting Auth Token ID ");
  const { authorization } = req.headers;
  return redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      return res.status(400).json("unauthorised");
    } else {
      return res.json({ id: reply });
    }
  });
};

const createSession = (user) => {
  // create JWT token and return user data
  const { email, id } = user;
  const token = signToken(email);
  return setToken(token, id)
    .then(() => {
      return { success: "true", userId: id, token: token };
    })
    .catch(console.log);
};

const signToken = (email) => {
  const jwtPayload = { email };
  return jwt.sign(jwtPayload, "JWT_SECRET", { expiresIn: "2 days" });
};

const setToken = (key, value) => {
  console.log("setting token in redis", key, "-", value);
  //redis does not by default return a promise. wrap it in a Promise.resolve
  return Promise.resolve(redisClient.set(key, value));
};

module.exports = {
  signinAuthentication: signinAuthentication,
  redisClient: redisClient,
};
