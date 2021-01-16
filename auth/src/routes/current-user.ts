import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { currentUserManager } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";

const router = express.Router();

router.get(
  "/api/users/currentUser",
  currentUserManager,
  requireAuth,
  (req, res) => {
    res.send({ currentUser: req.currentUser || null });
  }
);

// we are renaming the router to avoid name collisions
export { router as currentUserRouter };
