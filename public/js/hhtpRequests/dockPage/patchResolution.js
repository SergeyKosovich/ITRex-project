import { data } from '../../main.js';

const { docUrl } = data;
export default function patchResolution(text, currenPatient) {
  return fetch(docUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ resolution: text, name: currenPatient }),
  });
}
