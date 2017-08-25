import 'babel-polyfill';
import dotenv from 'dotenv';

// config dotenv
dotenv.config();

// Check for api key
const apikey = process.env.OPENSECRETS_API_KEY;
!apikey ? console.log('Warning: OpenSecrets API key required') : console.log('api key found');

class OpenSecretsCall {
  constructor(method, params) {
    this.apikey = process.env.OPENSECRETS_API_KEY;
    this.output = 'json';
    this.method = method;
    this.params = params;
    this.baseurl = 'http://http://www.opensecrets.org/api/';
  }

  fetchData() {
    let url = `${this.baseurl}?method=${this.method}&apikey=${this.apikey}&output=json&id${this.params}`;
    console.log(url);
  }
}

const getLegislators = new OpenSecretsCall
