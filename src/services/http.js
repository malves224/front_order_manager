import axios from 'axios';

class HttpService {
  constructor() {
    this.client = axios.create({
      baseURL: process.env.VUE_APP_API_URL || 'http://localhost:3000'
    })
  }

}

export default HttpService;