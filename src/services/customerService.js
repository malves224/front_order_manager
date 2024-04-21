import HttpService from "./http";

class Customer extends HttpService {
  constructor() {
    super();
    this.namespace = "customer";
  }

  async login({ name, phone }) {
    return this.client.post(`${this.namespace}/login`, { name, phone });
  }
}

export default Customer;