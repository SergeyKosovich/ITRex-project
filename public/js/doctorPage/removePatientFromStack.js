import deleteFromStack from '../httpRequests/docPageRequests/deleFromStack.js';
import renderNewPatients from './renderNewPatients.js';
import getFirstUserInQueue from '../httpRequests/docPageRequests/getFirstUserInQueue.js';

export default function removePatientFromStack(removeButton, lastPatient, patientData) {
  removeButton.addEventListener('click', async () => {
    await deleteFromStack();
    const res = await getFirstUserInQueue();
    if (!res) {
      lastPatient.innerHTML = 'No patient';
      patientData.pop();
      return;
    }
    patientData.push(res);
    renderNewPatients(lastPatient, patientData);
  });
}
