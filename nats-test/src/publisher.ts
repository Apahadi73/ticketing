import nats from "node-nats-streaming";
import { TicketCreatedPublisher } from "../../tickets/src/events/ticket-created-publisher";

console.clear();

const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", async () => {
  console.log("Publisher connected to NATS");

  // we can only share raw data or plain string
  //cannot share js object
  const data = {
    id: "123",
    title: "concert",
    price: 20,
    userId: "Hari",
  };
  const publisher = new TicketCreatedPublisher(stan);
  try {
    // publishes the data to the subject channel
    await publisher.publish(data);
  } catch (err) {
    console.log(err);
  }
});
