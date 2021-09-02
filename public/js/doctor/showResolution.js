import getPatientsResolutionsById from '../httpRequests/getResolutionById.js';

export default async function showResolution(form, input, resolutionText) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const defaultText = 'no matches by this id';
    const response = await getPatientsResolutionsById(input.value);
    if (!response) {
      resolutionText.value = defaultText;
      return;
    }
    resolutionText.value = response;
  });
}
