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

  // Init url
  initUrl() {
    let url = `${this.baseurl}?method=${this.method}&apikey=${this.apikey}&output=${this.output}`;
    for (var prop in this.params) {
      url += `&${prop}=${this.params[prop]}`;
    }
    console.log(`url: ${url}`);
    return url;
  }

  fetchData() {
    let url = this.initUrl();

    // Handle response status
    const status = (response) => {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(new Error(response.statusText));
      }
    }

    // Handle response JSON parsing
    const json = (response) => {
      return response.json();
    }

    // Request data
    fetch(url)
    .then(status)
    .then(json)
    .then((data) => {
      console.log(`Request succeeded, \n${data}`);
    })
    .catch((err) => {
      console.log(`Request failed, \n${err}`);
    });
  }
}

// Test api call

// const getLegislators = new OpenSecretsCall('getLegislators', 'NJ');
// getLegislators.fetchData();

const candSummary = new OpenSecretsCall('candSummary', { cid: 'N00007360', cycle: '2012'});
candSummary.fetchData();
