import patchResolution from '../httpRequests/docPageRequests/patchResolution.js';

export default function addResolution(lastPatient, setResolution, textarea) {
  setResolution.addEventListener('submit', async (e) => {
    e.preventDefault();
    const resolutionText = textarea.value;
    if (lastPatient.innerHTML === 'No patient') {
      return;
    }
    const currentPatientId = lastPatient.innerHTML.split('id:')[1];
    const ttl = e.target.elements.ttlNumber.value;
    const res = await patchResolution(resolutionText, currentPatientId, ttl);
    if (!res) {
      return;
    }
    textarea.value = '';
    e.target.elements.ttlNumber.value = '';
  });
}
