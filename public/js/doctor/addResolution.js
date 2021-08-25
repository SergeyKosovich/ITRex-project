import patchResolution from '../httpRequests/docPageRequests/patchResolution.js';

export default function addResolution(lastPatient, setRes, textarea) {
  setRes.addEventListener('submit', async (e) => {
    e.preventDefault();
    const resolutionText = textarea.value;
    const currentPatient = lastPatient.innerHTML;
    const ttl = e.target.elements.ttlNumber.value;
    const res = await patchResolution(resolutionText, currentPatient, ttl);
    if (!res) {
      return;
    }
    textarea.value = '';
    e.target.elements.ttlNumber.value = '';
  });
}
