import patchResolution from '../httpRequests/docPageRequests/patchResolution.js';

export default function addResolution(lastPatient, setResolution, textarea) {
  setResolution.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (lastPatient.innerHTML === 'No patient') {
      return;
    }
    const resolutionText = textarea.value.trim();
    const ttl = e.target.elements.ttlNumber.value;
    const res = await patchResolution(resolutionText, ttl);
    if (!res) {
      return;
    }
    textarea.value = '';
    e.target.elements.ttlNumber.value = '';
  });
}
