import { BadRequestError } from "./../errors/bad-request-error";
import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { RequestValidationError } from "../errors/request-validation-error";
import { User } from "../models/user";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    // we use the body middleware to validate the body of the request body
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4  to 20 character in length."),
  ],
  async (req: Request, res: Response) => {
    // we extract result from validated request object
    // that is passed through validation middleware xabove
    const errors = validationResult(req);
    // console.log(errors);
    if (!errors.isEmpty()) {
      // sends array of the errors obtained from validationResult
      // return res.status(400).send(errors.array());

      // throw new Error("Invalid email or password");
      //  our error handler will automatically pick up this error

      // pass error to the following middleware
      throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;

    // checks if the user already exists in the db
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // throw this error when the server receivesd bad request from the frontend
      throw new BadRequestError("Email in use");
    }

    const user = User.build({
      email,
      password,
    });

    // saves to db
    await user.save();

    // Generates JWT
    const userJwt = jwt.sign(
      // payload
      {
        id: user.id,
        email: user.email,
      },
      // secret key
      process.env.JWT_KEY!
    );

    // Stores it on the session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);

    // hashes the password
  }
);

// we are renaming the router to avoid name collisions
export { router as signupRouter };
