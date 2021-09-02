import addFirstPatient from './addFirstPatient.js';
import deleteFromStack from '../httpRequests/docPageRequests/deleFromStack.js';
import removeUserMessage from './webSocketsMessages/removeUser.js';

export default function removePatientFromStack(removeButton, firstPatient) {
  removeButton.addEventListener('click', async () => {
    const response = await deleteFromStack();
    if (!response) {
      return;
    }
    addFirstPatient(response, firstPatient);
    removeUserMessage();
  });
}
