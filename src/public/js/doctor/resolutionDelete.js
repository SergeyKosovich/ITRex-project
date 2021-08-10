export default function resolutionDelete(val) {
  return fetch('/resolution', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: val }),
  });
}
