import WebSocket from 'ws';
import { queqe, dataStorage } from '../storage.js';
import { _WS_PORT } from '../ports.js';

const ws = new WebSocket(`ws://localhost:${_WS_PORT}`);

export default class Controller {
  checkQueqe(q = queqe) {
    return (req, res) => {
      if (q[0]) {
        return res.status(200).send(JSON.stringify(q[0]));
      }
      return res.status(204).send('No patient');
    };
  }

  getName(q = queqe) {
    return (req, res) => {
      if (q[0]) {
        res.status(200).send(JSON.stringify(q[0]));
        return;
      }
      res.status(204).send('No patient');
    };
  }

  addUser(m = dataStorage, que = queqe) {
    return (req, res) => {
      que.push(req.body.name);
      ws.send(JSON.stringify({ name: req.body.name, event: 'addUser' }));
      if (req.body.ttl) {
        setTimeout(() => {
          m.delete(req.body.name);
          const index = que.indexOf(req.body.name);
          que.splice(index, 1);
          ws.send(
            JSON.stringify({ name: req.body.name, event: 'removeAfterTtl' }),
          );
        }, req.body.ttl * 1000);
      }
      res.status(200).send('success');
    };
  }

  getQueue(q = queqe) {
    return (req, res) => {
      if (q.length > 0) {
        res.status(200).send(JSON.stringify(q));
        return;
      }
      res.status(204).send('no patients');
    };
  }
}
