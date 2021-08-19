/* eslint-disable import/prefer-default-export */
import { wsPort } from './config.js';

const queqe = [];
const map = new Map();
const usersInTtl = new Map();
const ws = new WebSocket(`ws://localhost:${wsPort}`);
export const data = {
  queqe,
  map,
  ws,
  usersInTtl,
};
