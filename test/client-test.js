var vows = require('vows');
var assert = require('assert');

var KPI = require('../');

vows.describe('Client test').addBatch({
	'v1': {
		'topic': new KPI.Client(),
		'get v1': {
			'topic': function(client) {
				client.get('/v1', null, this.callback);
			},
			'returns object': function(err, result) {
				assert.isNull(err);
				assert.isObject(result['/organizations']);
				assert.isObject(result['/projects']);
			}
		}
	}
}).export(module);
