export default function deleteFromStack(userUrl) {
  return fetch(userUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
