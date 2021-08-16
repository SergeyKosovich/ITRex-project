import addFirstPatient from './addFirstPatient.js';
import { data } from '../main.js';
import deleteFromStack from '../hhtpRequests/dockPage/deleFromStack.js';

const { userUrl } = data;

export default function reomoveFromStack(removeButton, firstPat, ws) {
  removeButton.addEventListener('click', async () => {
    try {
      const lastPatient = await deleteFromStack(userUrl);
      let response = 'No patient';
      if (lastPatient.status !== 200 && lastPatient.status !== 204) {
        throw new Error(lastPatient.status);
      }
      if (lastPatient.status === 200) {
        response = await lastPatient.json();
      }
      addFirstPatient(response, firstPat);
      ws.send(
        JSON.stringify({
          event: 'removeUser',
        }),
      );
    } catch (err) {
      console.log(err.name, err.message);
    }
  });
}
