import axios from 'axios';

class HttpService {
  constructor() {
    this.client = axios.create({
      baseURL: process.env.VUE_APP_API_URL || 'http://192.168.15.25:3000/'
    })
  }

}

export default HttpService;