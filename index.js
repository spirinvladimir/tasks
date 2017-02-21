const http = require('http');
const path = require('path');
const express = require('express');
const app = express();
const WebSocket = require('ws');
const db = require('dirty')('./tasks.json');
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const protocol = require('./lib/protocol');
const decode = protocol.decode;
const encode = protocol.encode;
const list = require('./server/list');
const port = require('./config').port;
const events = require('./lib/events');
const send = require('./lib/send');
const eventCreate = events.create;
const eventRead = events.read;
const eventUpdate = events.update;
const eventDelete = events.delete;
const eventSendAllIds = events.sendAllIds;
const C = require('./server/create');
const R = require('./server/read');
const U = require('./server/update');
const D = require('./server/delete');

app.use(express.static(path.join(__dirname, 'public')));

wss.on('connection', (socket) => {
  let CRUD = {};
  CRUD.eventCreate = C(db, encode(send(socket, eventCreate)));
  CRUD.eventRead =   R(db, encode(send(socket, eventRead)));
  CRUD.eventUpdate = U(db, encode(send(socket, eventUpdate)));
  CRUD.eventDelete = D(db, encode(send(socket, eventDelete)));

  socket.on('message' , decode(CRUD));

  encode(send(socket, eventSendAllIds))(list(db));
});

db.on('load', () => {
  server.listen(port, () => {
    process.stdout.write('the server is available on http://localhost:' + port + '/\n');
  });
});
