import test from 'ava';
import OpenSecretsCall from './src/index';

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
  }, TypeError);

  t.is(error.message, 'Whoops! Output value is invalid');
});

// checkApiKey() tests [3]
test('checkApiKey returns correct val when unspecified', async t => {
  process.env.OPENSECRETS_API_KEY = 'apikey';
  const candSummary = new OpenSecretsCall('candSummary', { cid: 'N00007360', cycle: '2012'});

  // Apikey defined as process.env.OPENSECRETS_API_KEY when unspecified
  t.is(typeof candSummary.checkApiKey(), 'string');
  t.is(candSummary.checkApiKey(), 'apikey');
});

test('checkApiKey returns correct val when specified', async t => {
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
  }, TypeError);

  t.is(error.message, 'Whoops! OpenSecrets API key required');
});
