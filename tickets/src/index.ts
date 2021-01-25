import mongoose from "mongoose";

import { app } from "./app";
import { natsProvider } from "./nats-provider";

const start = async () => {
  // when the app starts, the app checks for the process env variables
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID must be defined");
  }
  if (!process.env.NATS_URL) {
    throw new Error("NATS_URL must be defined");
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID must be defined");
  }

  try {
    // we have defined cluster id in nats depl
    await natsProvider.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    // graceful shutdown for the nats client
    natsProvider.client.on("close", () => {
      console.log("NATS connection closed!");
      // exits process entirely anytime the client loses access to the nats
      process.exit();
    });
    // watches for signal interrupt and termination
    process.on("SIGINT", () => natsProvider.client.close());
    process.on("SIGTERM", () => natsProvider.client.close());
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
};

start();
