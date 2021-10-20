const mongoose = require("mongoose");

/* const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("connected to MongoDB for myApp4");
  } catch (error) {
    console.log("Error in MongoDB connection", err.message);
    process.exit(1);
  }
}; */

const connectDB = () => {
  mongoose
    .connect(process.env.dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => {
      console.log("connected to MongoDB for myApp4");
    })
    .catch((error)=>{
      console.log("Error in MongoDB connection", error.message);
    })

  mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to db...");
  });

  mongoose.connection.on("error", (error) => {
    console.log(error.message);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose connection is disconnected...");
  });

  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log(
        "Mongoose connection is disconnected due to app termination..."
      );
      process.exit(0);
    });
  });
};

module.exports = connectDB;
