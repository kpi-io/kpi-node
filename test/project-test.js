var vows = require('vows');
var assert = require('assert');

var KPI = require('../');


vows.describe('Project test').addBatch({
	'Test Project': {
		'topic': new KPI.Project({
			projectId: '52baa27dd6079b0b23df5bcd',
			projectKey: 'e66ebc66-856d-48d1-8cbc-e67357c55583',
			writeKey: 'df897117-8428-48a8-92e8-36b07a7864d5',
			readKey: '0b582ecd-a965-4a42-b72e-34a2461e9b16'
		}),
		'add data': {
			'topic': function(project) {
				project.addData('test_collection', {
					prop1: 1,
					prop2: 'prop'
				}, this.callback);
			},
			'returns success': function(err, result) {
				assert.isNull(err);
			}
		}
	}
}).export(module);
