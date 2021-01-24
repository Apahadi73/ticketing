import { Subjects } from "../types/subjects";
import { OrderStatus } from "../types/order-status";
export interface OrderCreatedEvent {
  subject: Subjects.OrderCreated;
  data: {
    id: string;
    status: OrderStatus;
    // userid is for the payments service to know the usermight submit a payment for ticket
    userId: string;
    //provides timer for the expiration service
    expiresAt: string;
    // tells ticket service not to edit this ticket
    ticket: {
      id: string;
      price: number;
    };
  };
}
