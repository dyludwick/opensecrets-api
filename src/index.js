import 'babel-polyfill';
import dotenv from 'dotenv';
import promise from 'es6-promise';
import 'isomorphic-fetch';

// Config dotenv
dotenv.config();

// Init es-6 promise
promise.polyfill();

// Define api call class
class OpenSecretsCall {
  constructor(method, params, output, apikey) {
    this.apikey = apikey || process.env.OPENSECRETS_API_KEY;
    this.output = output || 'json';
    this.method = method;
    this.params = params;
    this.baseurl = 'http://www.opensecrets.org/api/';
  }

  // Check output
  checkOutput(output) {
    let validVals = ['json', 'xml'];
    if (validVals.indexOf(output) === -1) {
      throw new Error('Whoops! Output value is invalid');
    } else {
      return true;
    }
  }

  // Check for api key
  checkApiKey(apikey) {
    if (!apikey) {
      throw new Error('Whoops! OpenSecrets API key required');
    } else {
      return true;
    }
  }

  // Initiate url
  initUrl() {
    // Call checkApiKey() and checkOutput()
    let apikey,
        output;
    try {
      apikey = this.checkApiKey(this.apikey);
      output = this.checkOutput(this.output);
    } catch (e) {
      console.log(`${e.name} : ${e.message}`);
    }
    // Build url
    if (apikey) {
      let url = `${this.baseurl}?method=${this.method}&apikey=${this.apikey}&output=${this.output}`;
      for (var prop in this.params) {
        url += `&${prop}=${this.params[prop]}`;
      }
      console.log(`url: ${url}`);
      return url;
    }
  }

  // Get the data
  fetchData() {
    let url = this.initUrl();

    // Handle fetch response status
    const status = (response) => {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(new Error(response.statusText));
      }
    }

    // Handle fetch response JSON parsing
    const json = (response) => {
      return response.json();
    }

    // Handle fetch response XML
    const text = (response) => {
      return response.text();
    }

    // Fetch API
    if (typeof url !== 'undefined' && this.output === 'json') { // JSON
      fetch(url)
      .then(status)
      .then(json)
      .then((data) => {
        console.log(`Request succeeded, \n${data}`);
      })
      .catch((err) => {
        console.log(`Request failed, \n${err}`);
      });
    } else if (typeof url !== 'undefined' && this.output === 'xml') { // XML
      fetch(url)
      .then(status)
      .then(text)
      .then((data) => {
        console.log(`Request succeeded, \n${data}`);
      })
      .catch((err) => {
        console.log(`Request failed, \n${err}`);
      });
    }
  }
}

// Test api call

// const getLegislators = new OpenSecretsCall('getLegislators', 'NJ');
// getLegislators.fetchData();

const candSummary = new OpenSecretsCall('candSummary', { cid: 'N00007360', cycle: '2012'});
candSummary.fetchData();
