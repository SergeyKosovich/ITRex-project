export default function namePost(inner, value) {
  return fetch('/name', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: inner, ttl: value }),
  });
}
