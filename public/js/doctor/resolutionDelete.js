import { data } from '../main.js';

const { docUrl } = data;

export default function resolutionDelete(val) {
  return fetch(docUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: val }),
  });
}
