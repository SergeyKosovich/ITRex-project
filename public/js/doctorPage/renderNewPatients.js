export default async function renderNewPatients(lastPatient, patientData) {
  if (patientData) {
    lastPatient.innerHTML = `${patientData[0].firstName} ${patientData[0].lastName}`;
  }
}
