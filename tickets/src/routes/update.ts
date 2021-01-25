import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  validatesRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
} from "@mgktickets/common";
import { Ticket } from "../models/ticket";
import { TicketUpdatedPublisher } from "../events/ticket-updated-publisher";
import { natsProvider } from "../nats-provider";

const router = express.Router();

router.put(
  "/api/tickets/:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be provided and must be greater than 0"),
  ],
  validatesRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      throw new NotFoundError();
    }

    // only allows creator of the ticket to update the ticket
    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    ticket.set({
      title: req.body.title,
      price: req.body.price,
    });
    await ticket.save();
    // publishes the updated ticket to the nats channel
    new TicketUpdatedPublisher(natsProvider.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
    });

    res.send(ticket);
  }
);

export { router as updateTicketRouter };
