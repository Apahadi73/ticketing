import { TicketCreatedEvent } from "../../../common/src/events/tickets-srv-events/ticket-created-event";
import { Subjects } from "../../../common/src/events/types/subjects";
import { Publisher } from "../../../common/src/events/bases/publisher";

// creates new TicketCreatedPublisher object and listens to the subscription channel of "ticket:created"
export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  // enforces subject to be of following type
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
