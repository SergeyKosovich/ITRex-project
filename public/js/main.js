/* eslint-disable import/prefer-default-export */
import { wsPort } from './config.js';

const ws = new WebSocket(`ws://localhost:${wsPort}`);
export const data = {
  ws,
};
