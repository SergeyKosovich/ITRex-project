/* eslint-disable import/extensions */
import WebSocket from 'ws';
import { queqe, dataStorage } from '../storage.js';
import { port } from './pacControllers.js';

const ws = new WebSocket(`ws://localhost:${port.wsPort}`);

export default class Service {
  addToQue(que = queqe) {
    return (req, res, next) => {
      que.push(req.body.name);
      next();
    };
  }

  removeAfterTtl(m = dataStorage, q = queqe) {
    return (req, res, next) => {
      if (req.body.ttl) {
        setTimeout(() => {
          m.delete(req.body.name);
          const index = q.indexOf(req.body.name);
          q.splice(index, 1);
          ws.send(
            JSON.stringify({ name: req.body.name, event: 'removeAfterTtl' }),
          );
        }, req.body.ttl * 1000);
      }
      next();
    };
  }

  removeTopPacient(req, res, next, q = queqe) {
    q.shift();
    next();
  }

  wsMessage(req, res, next) {
    ws.send(JSON.stringify({ name: req.body.name, event: 'addUser' }));
    next();
  }
}
