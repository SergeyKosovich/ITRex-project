import express from 'express';
import path from 'path';
import WebSocket, { WebSocketServer } from 'ws';
import nameRouter from './src/routes/nameRoutes.js';
import resRouter from './src/routes/resRouter.js';
import { queqe } from './src/consts.js';

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
app.use(express.static(`${dirname}/src/public`));
app.use('/name', nameRouter);
app.use('/resolution', resRouter);

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
