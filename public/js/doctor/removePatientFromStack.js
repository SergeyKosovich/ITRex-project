import addFirstPatient from './addFirstPatient.js';

import deleteFromStack from '../hhtpRequests/dockPage/deleFromStack.js';

export default function reomoveFromStack(removeButton, firstPat, ws) {
  removeButton.addEventListener('click', async () => {
    const response = await deleteFromStack();
    if (!response) {
      return;
    }
    addFirstPatient(response, firstPat);
    ws.send(
      JSON.stringify({
        event: 'removeUser',
      }),
    );
  });
}
