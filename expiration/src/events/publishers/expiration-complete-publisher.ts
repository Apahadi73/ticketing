import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@mgktickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
