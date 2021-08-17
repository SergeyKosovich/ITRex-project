import patchResolution from '../hhtpRequests/dockPage/patchResolution.js';

export default function addResolution(storage, lastPatient, setRes, textarea) {
  setRes.addEventListener('submit', async (e) => {
    e.preventDefault();
    const resolutionText = textarea.value;
    const currenPatient = lastPatient.innerHTML;
    const res = await patchResolution(resolutionText, currenPatient);
    if (!res) {
      return;
    }
    textarea.value = '';
  });
}
