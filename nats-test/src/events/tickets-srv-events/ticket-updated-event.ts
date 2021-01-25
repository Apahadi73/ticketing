import { Subjects } from "../types/subjects";

export interface TicketUpdatedEvent {
  subject: Subjects.TicketUpdated;
  data: {
    id: string;
    userId: string;
    title: string;
    price: number;
  };
}
