import HttpService from "./http";

class BrasilApi extends HttpService {
  constructor() {
    super('https://brasilapi.com.br/api');
  }

  getByCep(cep) {
    return this.client.get(`/cep/v1/${cep}`);
  }

}

export default BrasilApi;