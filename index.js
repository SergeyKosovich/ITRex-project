import express from 'express';
import path from 'path';
import WebSocket, { WebSocketServer } from 'ws';
import pacRouter from './src/pacient/pacRoutes.js';
import docRouter from './src/doctor/docRouter.js';
import { queqe } from './src/consts.js';
import errorHandler from './src/handlers/errorHandler.js';

const dirname = path.resolve();
const PORT = 3000;
const app = express();

const wss = new WebSocketServer({
  port: 8080,
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
app.set('view engine', 'ejs');
app.set('views', path.resolve(`${dirname}/src`, 'views'));
app.use(express.static(`${dirname}/public`));
app.use('/name', pacRouter);
app.use('/resolution', docRouter);

app.get('/doctor', (req, res) => {
  res.render('doctor', { currentPat: queqe[0] });
});

app.get('/patient', (req, res) => {
  res.render('patient', { map: queqe });
});

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`server has been started on port ${PORT}`);
});
app.use(errorHandler);
