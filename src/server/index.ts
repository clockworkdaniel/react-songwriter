import * as express from "express";
import * as bodyParser from "body-parser";
// var path = require('path');
import * as mongoose from "mongoose";
import * as session from "express-session";

const MongoStore = require("connect-mongo")(session);

const mongoDB = "mongodb://127.0.0.1:27017";
const db = mongoose.connection;

// require('./database');
// require('./seed');

mongoose.connect(mongoDB);

db.on("error", console.error.bind(console, "MongoDB connection error"));

const app = express();

const songsRouter = require("./routes/song");
const artistsRouter = require("./routes/artist");
const usersRouter = require("./routes/user");

const PORT = 8000;

// currently this places the SPA on the homepage
// var DIST_DIR = path.join(__dirname, '/../../dist');
// app.use('/', express.static(DIST_DIR));

// app.use - mounts the specified middleware function or functions at the specified path
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, HEAD, OPTIONS, POST, PUT, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(
  session({
    secret: "giddy up",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false // NOTE: look into changing this
    },
    store: new MongoStore({ mongooseConnection: db })
  })
);
app.use(bodyParser.json());

app.use("/api", songsRouter);
app.use("/api", artistsRouter);
app.use("/api", usersRouter);

// app.listen - Binds and listens for connections on the specified host and port
app.listen(PORT, () => {
  console.log("The server is running on port 8000!");
});
