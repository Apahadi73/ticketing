import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error";
// we make this file to send uniform error object to the frontend side
// the function has to have following four arguments
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res.status(400).send({
    errors: [
      {
        message: "Something went wrong",
      },
    ],
  });
};
