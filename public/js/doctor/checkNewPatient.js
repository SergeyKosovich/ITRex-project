import getFirstPatientInQueue from '../httpRequests/docPageRequests/getFirstPatientInQueue.js';

export default async function checkNewPatients(lastPatient) {
  const jwt = localStorage.getItem('doctor-jwt');
  const patientCurrent = await getFirstPatientInQueue(jwt);
  lastPatient.innerHTML = patientCurrent.name;
}
