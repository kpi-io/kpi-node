KPI.IO
=======
## Introduction
[KPI.IO](http://kpi.io) is a custom analytics backend.
You can easily send, analyse and visualize your data.

## Node.JS API
The example below shows you how to send data in your Node.JS application.

	var KPI = require('kpi-node');

	var project = new KPI.Project({
		projectId: '52ba9e6bd6079b0b23df5bcc',
		writeKey: 'e197dbca-e991-4829-9ed7-14e21a4fe452'
	});

	var data = {
		// Your data
	};
	project.addData('messages', data, function(err) {
		if(err) {
			console.log(err);
		}
	});


For more, please visit [KPI.IO](http://kpi.io)

