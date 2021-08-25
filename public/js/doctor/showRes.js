import getResolutionByName from '../httpRequests/getResolutionByName.js';

export default async function showRes(form, input, resolutionText) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const defaultText = 'no matches by this name';
    const response = await getResolutionByName(input.value);
    if (!response) {
      resolutionText.value = defaultText;
      return;
    }
    resolutionText.value = response;
  });
}
