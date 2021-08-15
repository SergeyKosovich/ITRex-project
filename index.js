/* eslint-disable import/extensions */
import express from 'express';
import path from 'path';
import WebSocket, { WebSocketServer } from 'ws';
import pacRouter from './src/pacient/pacRoutes.js';
import docRouter from './src/doctor/docRouter.js';
import errorHandler from './src/handlers/errorHandler.js';
import { port } from './src/pacient/pacControllers.js';

const dirname = path.resolve();
const PORT = process.env.PORT ?? 3000;
const wsPort = process.env.wsPort ?? port.wsPort;
const app = express();
const wss = new WebSocketServer({
  port: wsPort,
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

app.listen(PORT, () => {
  console.log(`server has been started on port ${PORT}`);
});
app.use(errorHandler);
