import { data } from '../main.js';

const { docUrl } = data;
export default function resolutionPost(text, currenPatient) {
  return fetch(docUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ resolution: text, name: currenPatient }),
  });
}
