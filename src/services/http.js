import axios from 'axios';
import LocalStorage from './localStorage/localStorage';

class HttpService {
  constructor() {
    this.storage = new LocalStorage('customer')
    this.subdomain = window.location.hostname.split('.')[0];
    this.client = axios.create({
      baseURL: process.env.VUE_APP_API_URL ? `${this.subdomain}.${process.env.VUE_APP_API_URL}` : `http://${this.subdomain}.localhost:3000/`,
    });

    this.client.interceptors.request.use(
      (config) => {
        let customer = this.storage.get();
        if (customer) {
          config.headers['Authorization'] = customer.token;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

}

export default HttpService;