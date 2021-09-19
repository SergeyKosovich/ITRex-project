import addFirstPatient from './addFirstPatient.js';
import deleteFromStack from '../httpRequests/docPageRequests/deleFromStack.js';
import removeUserMessage from './webSocketsMessages/removeUser.js';

export default function removePatientFromStack(removeButton, firstPatient) {
  removeButton.addEventListener('click', async () => {
    const jwt = localStorage.getItem('doctor-jwt');

    const response = await deleteFromStack(jwt);
    if (!response) {
      return;
    }
    addFirstPatient(response, firstPatient);
    removeUserMessage();
  });
}
