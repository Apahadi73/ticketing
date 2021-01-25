import { Publisher, TicketUpdatedEvent, Subjects } from "@mgktickets/common";

// creates new TicketUpdatedPublisher object and publishes to the subscription channel of "ticket:created"
export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  // enforces subject to be of following type
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
