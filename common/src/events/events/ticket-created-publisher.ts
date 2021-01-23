import { TicketCreatedEvent } from "../tickets-srv-events/ticket-created-event";
import { Subjects } from "../types/subjects";
import { Publisher } from "../bases/publisher";

// creates new TicketCreatedPublisher object and listens to the subscription channel of "ticket:created"
export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  // enforces subject to be of following type
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
