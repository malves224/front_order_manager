import axios from 'axios';

class HttpService {
  constructor(url = undefined) {
    this.client = axios.create({
      baseURL: url ? url : process.env.VUE_APP_API_URL || 'http://192.168.15.25:3000/'
    })
  }

}

export default HttpService;