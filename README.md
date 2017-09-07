# OpenSecrets API

A simple library for the Center of Responsive Politics (CRP) OpenSecrets API. Their website currently features libraries for Python, PHP, and Ruby, so I figured this project would be a welcome addition for JavaScript users looking to play around with some political data.

Note: Use of the OpenSecrets.org API (Service) is provided free for educational, research, and non-commercial use. Commercial uses and republishing of data obtained obtained via this Service may involve a fee.

For more information, visit: [https://www.opensecrets.org/resources/create/api_tos.php]

## Getting started

1. Download project
2. cd into project folder and run npm start
3. drop dist/index.js where needed

## How to use

NOTE: An OpenSecrets API key is required, and can be obtained on their [website](https://www.opensecrets.org/resources/create/apis.php)

The project file supplies an OpenSecretsCall class whose constructor accepts the following parameters:
* method (required)
* params (required - varies by api call method)
* output (optional - accepts 'json' or 'xml' - if not specified, defaults to json)
* apikey (optional - if not specified, defaults to process.env.OPENSECRETS_API_KEY)

It is *highly recommended* to store your API key in a .env file for security reasons:
```
.env

OPENSECRETS_API_KEY=Your-API-Key-Goes-Here
```

To make a request, simply specify your method and params as follows:

```javascript
const OpenSecretsCall = require('/your/path/to/file');

// Using getLegislators API method
const getLegislators = new OpenSecretsCall('getLegislators', 'NJ');
getLegislators.fetchData();

// Using candSummary API method
const candSummary = new OpenSecretsCall('candSummary', { cid: 'N00007360', cycle: '2012'});
candSummary.fetchData();
```
For full API method documentation, check out the OpenSecrets API Docs link in the Resources section below.

## Testing

To run tests with `ava`, navigate to project directory and
```
npm test
```


## Resources

Opensecrets.org [https://www.opensecrets.org/]

OpenSecrets API Docs [https://www.opensecrets.org/resources/create/api_doc.php]
