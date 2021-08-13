/* eslint-disable import/extensions */
import addFirstPatient from './addFirstPatient.js';

export default function reomoveFromStack(removeButton, firstPat, ws) {
  removeButton.addEventListener('click', async () => {
    try {
      const lastPatient = await fetch('/name', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await lastPatient.json();
      addFirstPatient(data, firstPat);
      ws.send(
        JSON.stringify({
          event: 'removeUser',
        }),
      );
    } catch (err) {
      console.log(err);
    }
  });
}
