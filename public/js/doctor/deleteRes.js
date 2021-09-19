import deleteResolution from '../httpRequests/docPageRequests/deleteResolution.js';

export default function deleteRes(input, deleteForm, resolutionText) {
  deleteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!resolutionText.value) {
      return;
    }
    const response = await deleteResolution(input.value);
    if (!response) {
      return;
    }
    resolutionText.value = '';
    input.value = '';
  });
}
