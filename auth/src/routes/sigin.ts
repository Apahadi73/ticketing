import express from "express";

const router = express.Router();

router.post("/api/users/signin", (req, res) => {
  res.send("user signed in");
});

// we are renaming the router to avoid name collisions
export { router as signinRouter };
