import { requireAuth } from "@mgktickets/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Ticket } from "../models/ticket";
import { validatesRequest } from "@mgktickets/common";
import { natsProvider } from "../nats-provider";
import { TicketCreatedPublisher } from "../events/ticket-created-publisher";

const router = express.Router();

// creates new ticket
router.post(
  "/api/tickets",
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validatesRequest,
  async (req: Request, res: Response) => {
    // receives price and title from the request body
    const { title, price } = req.body;

    // creates new ticket
    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
    });
    await ticket.save();
    await new TicketCreatedPublisher(natsProvider.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
    });

    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
