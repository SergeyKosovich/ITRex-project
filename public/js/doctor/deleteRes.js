import resolutionDelete from './resolutionDelete.js';

export default function deleteRes(input, deleteform, resoltext) {
  deleteform.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!resoltext.value) {
      return;
    }
    try {
      const response = await resolutionDelete(input.value);
      if (response.status !== 200) {
        throw new Error(response.status);
      }
      resoltext.value = '';
      input.value = '';
    } catch (err) {
      console.log(err.name, err.message);
    }
  });
}
