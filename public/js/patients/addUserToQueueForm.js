import addPatientToStack from './addPatientToStack.js';
import postUserToQueue from '../httpRequests/patientPageRequests/postUserToQueue.js';

export default async function addUserToQueueForm(addForm, patientStack) {
  addForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const inner = e.target.elements.patient.value;
    const response = await postUserToQueue(inner);
    if (!response) {
      return;
    }
    addPatientToStack(patientStack, inner);
  });
}
