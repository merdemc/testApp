const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan"); // for logs
const createError = require('http-errors');

const connectDB = require("./controllers/connectDB");

const app = express();

dotenv.config({ path: "config/config.env" });
const PORT = process.env.PORT || 8080;

//mongodb connection
connectDB();

// middleware & static
app.use(morgan("dev"));
//app.use(express.static("public"));
app.use(express.json()); // To parse json data. No need bodyParser
app.use(express.urlencoded({ extended: true }));

// Routes

const routeProduct = require("./routes/routeProduct");

app.all("/test", (req, res, next) => {
  // console.log(req.query);
  // console.log(req.query.name);
  // console.log(req.query.price);
  // res.send(req.query)

  // console.log(req.params);
  // res.send(req.params)

  console.log(req.body);
  res.send(req.body);
});
app.use("/products", routeProduct);

//Creating Own Error Handler. 404 handler and pass to error handler
app.use((req, res, next) => {
//   const error = new Error("Not Found - Our own error");
//   error.status = 404;
//   next(error);

next(createError(404,"Not Found - Our own error with http-errors package"))

});

// Express Error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send({
    status: error.status || 500,
    message: error.message,
  });
});

app.listen(PORT, () => {
  console.log(`myApi4 is running on PORT${PORT}`);
});
