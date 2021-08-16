import { data } from '../../main.js';

const { userUrl } = data;

export default function newUserPost(inner, value) {
  return fetch(userUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: inner, ttl: value }),
  });
}
