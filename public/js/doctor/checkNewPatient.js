import getFirstUserInQueue from '../httpRequests/docPageRequests/getFirstUserInQueue.js';

export default async function checkNewPatients(lastPatient) {
  const userCurrent = await getFirstUserInQueue();
  lastPatient.innerHTML = userCurrent;
}
