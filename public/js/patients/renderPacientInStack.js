import addPacientToStack from './addPacientToStack.js';
import getQueue from '../httpRequests/patientPageRequests/getQueue.js';

export default async function renderPacientInStack(patientStack) {
  const queueArr = await getQueue();
  if (queueArr?.length > 0) {
    queueArr.forEach((pacient) => {
      addPacientToStack(patientStack, pacient);
    });
  }
}
