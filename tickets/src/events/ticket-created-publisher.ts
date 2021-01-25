import { Publisher, TicketCreatedEvent, Subjects } from "@mgktickets/common";

// creates new TicketCreatedPublisher object and publishes to the subscription channel of "ticket:created"
export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  // enforces subject to be of following type
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
