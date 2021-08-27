import getResolutionByName from '../httpRequests/getResolutionByName.js';

export default function showForPatient(form, input, resoltext) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const defaultText = 'no matches by this name';
    const response = await getResolutionByName(input.value);
    if (!response) {
      resoltext.value = defaultText;
      return;
    }
    resoltext.value = response;
  });
  form.addEventListener('focusout', (e) => {
    e.preventDefault();
    resoltext.value = '';
    input.value = '';
  });
}
