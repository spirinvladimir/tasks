//const WebSocket = require('ws');
const events = require('../lib/events');
const port = require('../config').port;
const eventSendAllIds = events.sendAllIds;
const hostname = location.hostname;
const url = ['ws://', hostname, ':', port].join('');
const ws = new WebSocket(url);

ws.onmessage = (message) => {
  console.log(message);
};

//ws.on(eventSendAllIds, (message) => {
//  alert(JSON.parse(message));
//});
