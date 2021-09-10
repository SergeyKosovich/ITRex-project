import patchResolution from '../httpRequests/docPageRequests/patchResolution.js';

export default function addResolution(patientData, setResolution, textarea) {
  setResolution.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!patientData[0]) {
      return;
    }
    const resolutionText = textarea.value;
    const currentPatientId = patientData[0].patient_id;
    const ttl = e.target.elements.ttlNumber.value;
    const res = await patchResolution(resolutionText, currentPatientId, ttl);
    if (!res) {
      return;
    }
    textarea.value = '';
    e.target.elements.ttlNumber.value = '';
  });
}
