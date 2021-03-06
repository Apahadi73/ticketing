import { Message } from "node-nats-streaming";
import { TicketCreatedEvent } from "../../../../common/src/events/tickets-srv-events/ticket-created-event";
import { Subjects } from "../../../../common/src/events/types/subjects";
import { Listener } from "../bases/listener";

// creates new TicketCreatedListner object and listens to the subscription channel of "ticket:created"
export class TicketCreatedListner extends Listener<TicketCreatedEvent> {
  // enforces subject to be of following type
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = "payment-service";

  onMessage(data: TicketCreatedEvent["data"], msg: Message): void {
    console.log("Event Data!", data);
    // acknowledges the message if the message is successfully consumed
    msg.ack();
  }
}
