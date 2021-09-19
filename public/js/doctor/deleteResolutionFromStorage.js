import deleteResolution from '../httpRequests/docPageRequests/deleteResolution.js';

export default function deleteResolutionFromStorage(
  input,
  deleteForm,
  resolutionText,
) {
  deleteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!input.value) {
      return;
    }
    const jwt = localStorage.getItem('doctor-jwt');

    const { success, error } = await deleteResolution(jwt, input.value);

    resolutionText.value = success || error;
    input.value = '';
  });
}
