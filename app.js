// const routes = require("./server/routes");

const app = require("express")();
const express = require("express");
const morgan = require('morgan');

const connectdb = require("./config/db");
const auth = require("./middleware/auth");

const authRoute = require("./routes/api/auth");
const userRoute = require("./routes/api/user");

global.User = require('./models/User')
global.Tweets = require("./models/Tweet");

const PORT = process.env.PORT || 5000;

connectdb();
app.use(morgan('tiny'));
app.use(require("cors")());
app.use(express.json({ extended: false }));

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);

// app.use("/api/user", require("./routes/api/user"));
// app.use("/api/auth", require("./routes/api/auth"));

app.listen(PORT, () => {
  console.log("Server Started on PORT : ", PORT);
});
