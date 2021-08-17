import getUser from '../hhtpRequests/dockPage/getUser.js';

export default async function checkNewPatients(lastPatient) {
  const userCurrent = await getUser();
  lastPatient.innerHTML = userCurrent;
}
