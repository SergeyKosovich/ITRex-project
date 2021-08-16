/* eslint-disable import/extensions */
import express from 'express';
import path from 'path';
import WebSocket, { WebSocketServer } from 'ws';
import pacRouter from './src/pacient/pacRoutes.js';
import docRouter from './src/doctor/docRouter.js';
import errorHandler from './src/handlers/errorHandler.js';
import { _PORT, _WS_PORT } from './src/ports.js';

const dirname = path.resolve();
const app = express();
const wss = new WebSocketServer({
  port: _WS_PORT,
});

wss.on('connection', (ws) => {
  ws.on('message', (data, isBinary) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
});

app.use(express.json());
app.use(express.static(`${dirname}/public`));
app.use('/name', pacRouter);
app.use('/resolution', docRouter);

app.listen(_PORT, () => {
  console.log(`server has been started on port ${_PORT}`);
});
app.use(errorHandler);
