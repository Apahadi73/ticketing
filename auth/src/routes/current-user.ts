import express from "express";

const router = express.Router();

router.get("/api/users/currentUser", (req, res) => {
  res.send("Request received. Hi there Amir");
});

// we are renaming the router to avoid name collisions
export { router as currentUserRouter };
