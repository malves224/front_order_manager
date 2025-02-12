import HttpService from "./http";
import { createConsumer } from "@rails/actioncable"


class Customer extends HttpService {
  constructor() {
    super();
    this.namespace = "customer";
    this.cableUrl = process.env.VUE_APP_API_URL || '192.168.15.25:3000'
    this.cable = createConsumer(`ws://${this.cableUrl}/cable?token=${this.storage.get().token}`)
  }

  async login({ name, phone }) {
    return this.client.post(`${this.namespace}/login`, { name, phone });
  }

  async identify({ phone }) {
    return this.client.get(`${this.namespace}/identify/${phone}`);
  }

  async createAddress(data) {
    return this.client.post(`${this.namespace}/addresses`, data);
  }

  async addresses() {
    return this.client.get(`${this.namespace}/addresses`);
  }

  async address() {
    return this.client.get(`${this.namespace}/addresses/last`);
  }

  async orders() {
    return this.client.get(`${this.namespace}/order`);
  }

  async doOrder(order) {
    return this.client.post(`${this.namespace}/order`, order);
  }

  async order(id) {
    return this.client.get(`${this.namespace}/order/${id}`);
  }

  followOrder(id, handleReceived, handleDisconnected = () => {}, handleConnected = () => {}) {
    this.cable.subscriptions.create(
      { channel: "OrderChannel", order_id: id },
      {
        connected() {
          handleConnected()
        },
        disconnected() {
          handleDisconnected()
        },
        received(data) {
          handleReceived(data)
        }
      }
    );
  }
}

export default Customer;