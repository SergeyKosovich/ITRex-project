import getResolutionByName from '../httpRequests/getResolutionByName.js';

export default async function showRes(form, input, resoltext) {
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
}
