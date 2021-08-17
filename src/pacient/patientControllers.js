import WebSocket from 'ws';
import { queqe, dataStorage } from '../storage.js';
import { WS_PORT } from '../ports.js';

const ws = new WebSocket(`ws://localhost:${WS_PORT}`);

export default class Controller {
  constructor() {
    this.queqe = queqe;
    this.dataStorage = dataStorage;
  }

  checkQueqe() {
    return (req, res) => {
      if (this.queqe[0]) {
        return res.status(200).json(this.queqe[0]);
      }
      return res.status(204).send();
    };
  }

  getName() {
    return (req, res) => {
      if (this.queqe[0]) {
        res.status(200).json(this.queqe[0]);
        return;
      }
      res.status(204).send();
    };
  }

  addUser() {
    return (req, res) => {
      this.queqe.push(req.body.name);
      ws.send(JSON.stringify({ name: req.body.name, event: 'addUser' }));
      if (req.body.ttl) {
        setTimeout(() => {
          this.dataStorage.delete(req.body.name);
          const index = this.queqe.indexOf(req.body.name);
          this.queqe.splice(index, 1);
          ws.send(
            JSON.stringify({ name: req.body.name, event: 'removeAfterTtl' }),
          );
        }, req.body.ttl * 1000);
      }
      res.status(200).send();
    };
  }

  getQueue() {
    return (req, res) => {
      if (this.queqe.length > 0) {
        res.status(200).json(this.queqe);
        return;
      }
      res.status(204).send();
    };
  }
}
