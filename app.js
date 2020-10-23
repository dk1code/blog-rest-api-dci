const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const port = process.env.PORT || 5000;

// routes

const usersRoutes = require("./routes/users");
const postsRoutes = require("./routes/posts");

// faker function

const createInitialData = require("./fakeData");

// database

mongoose.connect(
  `mongodb+srv://dk1code_admin:` +
    process.env.MONGO_ATLAS_PW +
    "@cluster0.x8gxk.mongodb.net/<dbname>?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", async () => {
  try {
    // await createInitialData();
    console.log("you are connected to db");
  } catch (err) {
    console.log(err);
  }
});

// standart middleware

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`listening at port ${port}`));

app.get("/", (req, res) => {
  res.send("<h1>Welcome to my API</h1>");
});

// routes

app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);

// error handling

app.use((req, res, next) => {
  const error = new Error(`requested url ${req.url} not found`);
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: { message: error.message },
  });
});
