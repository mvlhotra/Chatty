// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v1');
const color = require('randomcolor');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.color = color();
  wss.clients.forEach(client => {
    client.send(JSON.stringify({ nameColor: client.color, type: 'usersOnline', content: wss.clients.size, id: uuid() }));
  });




  ws.on('message', message => {
    const msgObj = JSON.parse(message);
    msgObj.id = uuid();
    msgObj.type === 'postMessage' ? msgObj.type = 'incomingMessage' : msgObj.type = 'incomingNotification';
    wss.clients.forEach(client => {
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify(msgObj));
      }
    });
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
    wss.clients.forEach(client => {
      client.send(JSON.stringify({ nameColor: client.color, type: 'usersOnline', content: wss.clients.size, id: uuid() }));
    });

  });
});