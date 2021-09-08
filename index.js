/* eslint-disable import/extensions */
import express from 'express';
import path from 'path';
import WebSocket, { WebSocketServer } from 'ws';
import patientRouter from './src/patient/patientRoutes.js';
import docRouter from './src/doctor/docRouter.js';
import authRouter from './src/auth/authRoutes.js';
import regRouter from './src/registration/registrationRouter.js';
import errorHandler from './src/handlers/errorHandler.js';
import { PORT, WS_PORT } from './src/config.js';

const dirname = path.resolve();
const app = express();
const wss = new WebSocketServer({
  port: WS_PORT,
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
app.use('/name', patientRouter);
app.use('/resolution', docRouter);
app.use('/registration', regRouter);
app.use('/auth', authRouter);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`server has been started on port ${PORT}`);
});
