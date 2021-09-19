import getFirstUserInQueue from '../httpRequests/docPageRequests/getFirstUserInQueue.js';

export default async function checkNewPatients(lastPatient) {
  const jwt = localStorage.getItem('doctor-jwt');
  const userCurrent = await getFirstUserInQueue(jwt);
  lastPatient.innerHTML = userCurrent;
}
