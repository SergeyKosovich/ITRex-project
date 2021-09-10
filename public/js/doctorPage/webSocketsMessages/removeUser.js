import { data } from '../../main.js';

const { ws } = data;
export default function removeUserMessage() {
  ws.send(
    JSON.stringify({
      event: 'removeUser',
    }),
  );
}
