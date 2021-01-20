import { TicketCreatedEvent } from "../../../common/src/events/tickets-srv-events/ticket-created-event";
import { Message } from "node-nats-streaming";
import { Subjects } from "../../../common/src/errors/subjects";
import { Publisher } from "../../../common/src/events/bases/base-publisher";

// creates new TicketCreatedPublisher object and listens to the subscription channel of "ticket:created"
export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  // enforces subject to be of following type
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
