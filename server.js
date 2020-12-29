const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require("knex");
const bcrypt = require("bcrypt");
const morgan = require("morgan");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
const auth = require("./controllers/authorization");

const db = knex({
  client: "pg",
  // connection: {
  //   host: "127.0.0.1",
  //   user: "postgres",
  //   password: "1234",
  //   database: "smart-brain",
  // },
  client: "pg",
  connection: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
  //process.env variables come from docker-compose file
  //connection: process.env.POSTGRES_URI,
});

const app = express();
app.use(bodyParser.json());
app.use(morgan("combined"));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("I hear you now xxxxyyyy");
});

app.get("/profile/:id", auth.requireAuth, (req, res) => {
  profile.handleProfile(req, res, db, bcrypt);
});
app.post("/profile/:id", auth.requireAuth, (req, res) => {
  console.log("req.body", req.body);
  profile.handleProfileUpdate(req, res, db);
});

app.put("/image", auth.requireAuth, (req, res) => {
  image.handleImage(req, res, db, bcrypt);
});

app.post("/signin", signin.signinAuthentication(db, bcrypt));
//console.log("##about to signinauthenticate");
//res.send("I hear you now xxxxyyyy");
// profile.handleProfile(req, res, db, bcrypt);

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
  console.log(
    "###connection = ",
    process.env.POSTGRES_HOST,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
    process.env.POSTGRES_DB
  );
});

app.post("/imageApiCall", auth.requireAuth, (req, res) => {
  image.handleImageApiCall(req, res);
});

app.listen(3000, () => {
  console.log("app is running on port 3000====#");
});
