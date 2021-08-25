import addFirstPatient from './addFirstPatient.js';
import deleteFromStack from '../httpRequests/docPageRequests/deleFromStack.js';
import removeUserMessage from './webSocketsMessages/removeUser.js';

export default function removeFromStack(removeButton, firstPat) {
  removeButton.addEventListener('click', async () => {
    const response = await deleteFromStack();
    if (!response) {
      return;
    }
    addFirstPatient(response, firstPat);
    removeUserMessage();
  });
}
