import { Stan } from "node-nats-streaming";
import nats from "node-nats-streaming";
class NatsProvider {
  // client might be undefined for some period of time
  private _client?: Stan;

  get client() {
    if (!this._client) {
      throw new Error("Cannot access NATS client before connecting!");
    }
    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string) {
    //   connect client to the nats channel
    this._client = nats.connect(clusterId, clientId, { url });

    return new Promise<void>((resolve, reject) => {
      this.client.on("connect", () => {
        console.log("Connected to the NATS ");
        resolve();
      });
      this.client.on("error", (err) => {
        //   reject the promise with received err object
        reject(err);
      });
    });
  }
}

// export the singleton object
export const natsProvider = new NatsProvider();
