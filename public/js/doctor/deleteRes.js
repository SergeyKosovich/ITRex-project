import deleteResolution from '../httpRequests/docPageRequests/deleteResolution.js';

export default function deleteRes(input, deleteform, resoltext) {
  deleteform.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!resoltext.value) {
      return;
    }
    const response = await deleteResolution(input.value);
    if (!response) {
      return;
    }
    resoltext.value = '';
    input.value = '';
  });
}
