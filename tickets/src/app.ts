import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { currentUser, NotFoundError, errorHandler } from "@mgktickets/common";
import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { indexTicketRouter } from "./routes";
import { updateTicketRouter } from "./routes/update";

// express app
const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
// check whether the user is signed in or not
app.use(currentUser);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

// all ticket routes
app.use(createTicketRouter);

// catch all middleware
app.all("*", async (req, res) => {
  throw new NotFoundError();
});

// error handler middleware
app.use(errorHandler);

export { app };
