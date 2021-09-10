import getFirstUserInQueue from '../httpRequests/docPageRequests/getFirstUserInQueue.js';
import renderNewPatients from './renderNewPatients.js';

export default async function checkNewPatients(lastPatient, patientData) {
  const res = await getFirstUserInQueue();
  if (!res) {
    lastPatient.innerHTML = 'No patient';
    patientData.pop();
    return;
  }
  patientData.push(res);
  renderNewPatients(lastPatient, patientData);
}
