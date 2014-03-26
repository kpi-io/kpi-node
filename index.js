// Copyright (c) KPI.IO
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// The latest version of this file can be found at https://github.com/kpi-io/kpi-node


var request = require('request');

var KPI = {
	baseUrl: 'http://api.kpi.io'
};

var Client = function(api_key, baseUrl) {
	this.api_key = api_key;
	this.baseUrl = baseUrl||KPI.baseUrl;
};
Client.prototype._send = function(method, url, params, body, callback) {
	callback = callback||function(err){
		if(err) {
			console.log(err);
		}
	};
	request({
		uri: this.baseUrl+url,
		method: method,
		qs: params,
		'Content-type': 'application/json',
		headers: {
			Authorization: this.api_key
		},
		json: body
	}, function(err, response, body) {
		if(err) {
			return callback(err);
		}
		try{
			if(typeof body === 'string') {
				body = JSON.parse(body);
			}
			if(body.response.code === 100) {
				return callback(null, body.result);
			}
			else {
				return callback(new Error(''+body.response.code+' : '+body.response.message));
			}
		}
		catch(err) {
			return callback(err);
		}
	});
};
Client.prototype.get = function(url, params, callback) {
  this._send('GET', url, params, null, callback);
};
Client.prototype.post = function(url, params, body, callback) {
  this._send('POST', url, params, body, callback);
};
Client.prototype.put = function(url, params, body, callback) {
  this._send('PUT', url, params, body, callback);
};
Client.prototype.del = function(url, params, callback) {
  this._send('DELETE', url, params, null, callback);
};

var Project = function(options) {
  var baseUrl = (options.baseUrl||KPI.baseUrl)+'/v1/projects/'+options.projectId;

  this.projectClient = new Client(options.projectKey, baseUrl);
  this.readClient = new Client(options.readKey, baseUrl);
  this.writeClient = new Client(options.writeKey, baseUrl);
};

Project.prototype.add =  Project.prototype.addData = function(collection, data, callback) {
  this.writeClient.post('/collections/'+collection+'/data', null, data, callback);
};

Project.prototype.update = function(collection, set, where, multi, callback) {
	if(typeof multi === 'function') {
		callback = multi;
		multi = false;
	}
  this.projectClient.put('/collections/'+collection+'/data', {
  	'collection': collection,
  	'filter': JSON.stringify(where),
  	'multi': JSON.stringify(!!multi)
  }, set, callback);
};

Project.prototype.del = function(collection, where, multi, callback) {
	if(typeof multi === 'function') {
		callback = multi;
		multi = false;
	}
  this.projectClient.del('/collections/'+collection+'/data', {
  	'collection': collection,
  	'filter': JSON.stringify(where),
  	'multi': JSON.stringify(!!multi)
  }, callback);
};

Project.prototype.select = function(expression, collection, where, callback) {
  this.readClient.get('/queries/advancedQuery', {
  	'q': JSON.stringify({
  		'select': expression,
    	'from': collection,
    	'where': where
    })
  }, callback);
};



KPI.Client = Client;
KPI.Project = Project;

module.exports = KPI;
