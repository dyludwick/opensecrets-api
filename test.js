import test from 'ava';
import OpenSecretsCall from './src/index';

test('Check output returns correct output', async t => {
  const candSummary = new OpenSecretsCall('candSummary', { cid: 'N00007360', cycle: '2012'});
  const candSummaryJson = new OpenSecretsCall('candSummary', { cid: 'N00007360', cycle: '2012'}, 'json');
  const candSummaryXml = new OpenSecretsCall('candSummary', { cid: 'N00007360', cycle: '2012'}, 'xml');
  const candSummaryErr = new OpenSecretsCall('candSummary', { cid: 'N00007360', cycle: '2012'}, 'jso');

  // Output defined as json when unspecified
  t.is(candSummary.checkOutput(), 'json');
  // Output defined as json when specified as json
  t.is(candSummaryJson.checkOutput(), 'json');
  // Output defined as xml when specified as xml
  t.is(candSummaryXml.checkOutput(), 'xml');

  // Throws error when output specified as invalid value
  const error = await t.throws(() => {
    candSummaryErr.checkOutput();
  }, TypeError);

  t.is(error.message, 'Whoops! Output value is invalid');
});
