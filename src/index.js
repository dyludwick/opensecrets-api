import 'babel-polyfill';
import dotenv from 'dotenv';
import promise from 'es6-promise';
import 'isomorphic-fetch';

// Config dotenv
dotenv.config();

// Init es-6 promise
promise.polyfill();

// Check for api key
const apikey = process.env.OPENSECRETS_API_KEY;
!apikey ? console.log('Warning: OpenSecrets API key required') : console.log('api key found');

// Define api call class
class OpenSecretsCall {
  constructor(method, params) {
    this.apikey = process.env.OPENSECRETS_API_KEY;
    this.output = 'json';
    this.method = method;
    this.params = params;
    this.baseurl = 'http://www.opensecrets.org/api/';
  }

  fetchData() {
    // Set url
    let url = `${this.baseurl}?method=${this.method}&apikey=${this.apikey}&output=json&id=${this.params}`;
    console.log(url);

    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
  }
}

const getLegislators = new OpenSecretsCall('getLegislators', 'NJ');
getLegislators.fetchData();
