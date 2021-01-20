import nats from "node-nats-streaming";
import { randomBytes } from "crypto";
import { TicketCreatedListner } from "./events/ticket-created-listner";

console.clear();
// creates random client id for the STAN lister objecy
const clientId = randomBytes(4).toString("hex");

const stan = nats.connect("ticketing", clientId, {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener " + clientId + " connected to NATS");

  stan.on("close", () => {
    console.log("NATS connection closed!");
    process.exit();
  });

  // creates new TicketCreatedListner object and listens to the subscription channel of "ticket:created"
  new TicketCreatedListner(stan).listen();
});

// watches for signal interrupt and termination
process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
