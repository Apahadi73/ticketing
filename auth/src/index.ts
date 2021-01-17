import mongoose from "mongoose";
import { app } from "./app";

// start the mongoose connection here
const start = async () => {
  // checks whether the JWT_KEY secret key exists or not
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined.");
  }
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
      // config options for the mongoose
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to mongodb");
  } catch (err) {
    console.log(err);
  }
  // listner
  app.listen(3000, () => {
    console.log("Listening on port 3000!");
  });
};

start();
