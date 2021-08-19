import getUser from '../httpRequests/docPageRequests/getUser.js';

export default async function checkNewPatients(lastPatient) {
  const userCurrent = await getUser();
  lastPatient.innerHTML = userCurrent;
}
