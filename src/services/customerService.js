import HttpService from "./http";

class Customer extends HttpService {
  constructor() {
    super();
    this.namespace = "customer";
  }

  async login({ name, phone }) {
    return this.client.post(`${this.namespace}/login`, { name, phone });
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
}

export default Customer;