import test from 'ava';
import OpenSecretsCall from './src/index';
import { originalkey } from './config';
import pify from 'pify';

// Ensure apikey is properly set
test.before('check opensecrets_api_key val', t => {
  t.truthy(process.env.OPENSECRETS_API_KEY);
});

// Re-set original process.env.OPENSECRETS_API_KEY value after each test
test.afterEach('restore opensecrets_api_key val', t => process.env.OPENSECRETS_API_KEY = originalkey);

// checkOutput() test [1]
test('checkOutput returns correct output val', async t => {
  const candSummary = new OpenSecretsCall('candSummary', { cid: 'N00007360', cycle: '2012'});
  const candSummaryJson = new OpenSecretsCall('candSummary', { cid: 'N00007360', cycle: '2012'}, 'json');
  const candSummaryXml = new OpenSecretsCall('candSummary', { cid: 'N00007360', cycle: '2012'}, 'xml');
  const candSummaryErr = new OpenSecretsCall('candSummary', { cid: 'N00007360', cycle: '2012'}, 'jso');

  // Output defined as 'json' when unspecified
  t.is(typeof candSummary.checkOutput(), 'string');
  t.is(candSummary.checkOutput(), 'json');

  // Output defined as 'json' when specified as json
  t.is(typeof candSummaryJson.checkOutput(), 'string');
  t.is(candSummaryJson.checkOutput(), 'json');

  // Output defined as 'xml' when specified as xml
  t.is(typeof candSummaryXml.checkOutput(), 'string');
  t.is(candSummaryXml.checkOutput(), 'xml');

  // Throws error when output specified as invalid value
  const error = await t.throws(() => {
    candSummaryErr.checkOutput();
  }, Error);

  t.is(error.message, 'Whoops! Output value is invalid');
});

// checkApiKey() tests [3]
test('checkApiKey returns correct val when unspecified', t => {
  process.env.OPENSECRETS_API_KEY = 'apikey';
  const candSummary = new OpenSecretsCall('candSummary', { cid: 'N00007360', cycle: '2012'});

  // Apikey defined as process.env.OPENSECRETS_API_KEY when unspecified
  t.is(typeof candSummary.checkApiKey(), 'string');
  t.is(candSummary.checkApiKey(), 'apikey');
});

test('checkApiKey returns correct val when specified', t => {
  process.env.OPENSECRETS_API_KEY = '';
  const candSummary = new OpenSecretsCall('candSummary', { cid: 'N00007360', cycle: '2012'}, '', 'apikey');

  // Apikey defined as apikey param when specified
  t.is(typeof candSummary.checkApiKey(), 'string');
  t.is(candSummary.checkApiKey(), 'apikey');
});

test('checkApiKey throws correct err when apikey undefined', async t => {
  process.env.OPENSECRETS_API_KEY = '';
  const candSummary = new OpenSecretsCall('candSummary', { cid: 'N00007360', cycle: '2012'}, '', '');

  // Throw err when apikey undefined
  const error = await t.throws(() => {
    candSummary.checkApiKey();
  }, Error);

  t.is(error.message, 'Whoops! OpenSecrets API key required');
});

// initUrl() tests [2]
test('initUrl fails to build url if checkApiKey throws err', t => {
  process.env.OPENSECRETS_API_KEY = '';
  const candSummary = new OpenSecretsCall('candSummary', { cid: 'N00007360', cycle: '2012'}, '', '');

  // url undefined if no apikey specified
  t.is(candSummary.initUrl(), undefined);
});

test('initUrl returns correct url val', t => {
  process.env.OPENSECRETS_API_KEY = 'apikey';
  const candSummary = new OpenSecretsCall('candSummary', { cid: 'N00007360', cycle: '2012'});

  // url built properly when apikey specified
  t.is(candSummary.initUrl(), 'http://www.opensecrets.org/api/?method=candSummary&output=json&apikey=apikey&cid=N00007360&cycle=2012')
});

// fetchData() tests
test('fetchData fails to make request if url is undefined', async t => {
  process.env.OPENSECRETS_API_KEY = '';
  const candSummary = new OpenSecretsCall('candSummary', { cid: 'N00007360', cycle: '2012'}, '', '');
  const data = await candSummary.fetchData();

  // Reject promise when apikey undefined
  t.is(data, undefined);
});

test('fetchData returns obj when called', async t => {
  process.env.OPENSECRETS_API_KEY = originalkey;
  const candSummary = new OpenSecretsCall('candSummary', { cid: 'N00007360', cycle: '2012'});
  const data = await candSummary.fetchData();

  // Resolve promise with fetch data
  t.is(typeof data, 'object');
});
