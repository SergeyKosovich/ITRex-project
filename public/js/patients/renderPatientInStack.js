import addPatientToStack from './addPatientToStack.js';
import getQueue from '../httpRequests/patientPageRequests/getQueue.js';

export default async function renderPatientInStack(patientStack) {
  const queueArr = await getQueue();
  if (queueArr?.length > 0) {
    queueArr.forEach((patient) => {
      addPatientToStack(patientStack, patient);
    });
  }
}
