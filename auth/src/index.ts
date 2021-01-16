import express from "express";
import cookieSession from "cookie-session";
import colors from "colors";
// notifies express for async errors
// without this module, we had to use next function which could confuse peers
import "express-async-errors";

import mongoose from "mongoose";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.set("trust proxy", true); // trust first proxy
// reads request json body
app.use(express.json());

// uses cookie session
app.use(
  cookieSession({
    // since we are going to use jwt, we disabled the configuration on this cookie
    signed: false,
    // cookies can only be used through https connection
    secure: true,
  })
);

// routes
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// we don't have to use next here because of the express-async-error module
app.all("*", async (req, res) => {
  throw new NotFoundError();
});

// middleware - error handlers
app.use(errorHandler);

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
    console.log(colors.green.bold("Listening on port 3000!"));
  });
};

start();
