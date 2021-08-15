/* eslint-disable import/prefer-default-export */
const queqe = [];
const map = new Map();
const usersInTtl = new Map();
const wsPort = 8080;
const userUrl = '/name';
const docUrl = '/resolution/';
const ws = new WebSocket(`ws://localhost:${wsPort}`);
export const data = {
  queqe, map, ws, docUrl, userUrl, usersInTtl,
};
