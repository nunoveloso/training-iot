var config = require('./config')
  ,	nitrogen = require('nitrogen')
  , BMP085Device = require('nitrogen-bmp085');

// The nitrogen-bmp085 module wraps the bmp085 module into a Nitrogen device that emits messages.
var bmp085 = new BMP085Device({
    name: 'BMP085 Device',
    nickname: 'bmp085',
    api_key: '/* 1. Add your API Key from the Nitrogen Web Admin here */'
});

var service = new nitrogen.Service(config);

// This establishes a session for your device with the Nitrogen service.
service.connect(bmp085, function(err, session) {
	if (err) return console.log('Failed to connect device: ' + err);

	setInterval(function() {

		// Nitrogen sensor devices take measurements and then callback with a set of Nitrogen messages.
		bmp085.measure(function(err, messages) {

		    // 2. Write the code to send these messages to the Nitrogen service.

		    // HINT: see http://nitrogen.io/.../ for an example.
        console.log('The temperature is currently ' + data.temperature + 'C and the pressure is currently ' + data.pressure + ' HPa.');

        var messages = [
            new nitrogen.Message({
                type: 'pressure',
                body: {
                    pressure: data.pressure
                }
            }),

            new nitrogen.Message({
                type: 'temperature',
                body: {
                    temperature: data.temperature
                }
            })
        ];

        nitrogen.Message.sendMany(session, messages);
		});

	}, 5 * 1000);
});
