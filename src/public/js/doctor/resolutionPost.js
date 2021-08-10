export default function resolutionPost(text, currenPatient) {
  return fetch('/resolution', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ resolution: text, name: currenPatient }),
  });
}
