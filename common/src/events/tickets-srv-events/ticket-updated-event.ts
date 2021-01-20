import { Subjects } from "../types/subjects";

export interface TicketCreatedEvent {
  subject: Subjects.TicketUpdated;
  data: {
    id: string;
    userId: string;
    title: string;
    price: number;
  };
}
