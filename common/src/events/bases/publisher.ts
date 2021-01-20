import { Message, Stan } from "node-nats-streaming";
import { Subjects } from "../types/subjects";

// generic event interface
export interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Publisher<T extends Event> {
  abstract subject: T["subject"];
  private client: Stan;

  // constructor
  constructor(client: Stan) {
    this.client = client;
  }

  //   publishes data to the subject channel
  publish(data: T["data"]): Promise<void> {
    //   returns a promise after promising the library
    return new Promise((resolve, reject) => {
      this.client.publish(this.subject, JSON.stringify(data), (err) => {
        if (err) {
          return reject(err);
        }
        console.log(`Event published to the subject ${this.subject}`);
        resolve();
      });
    });
  }
}