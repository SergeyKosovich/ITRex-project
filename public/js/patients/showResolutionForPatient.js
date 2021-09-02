import getPatientsResolutionsById from '../httpRequests/getResolutionById.js';

const userNamesAndId = document.querySelector('.input-block__input');

export default function showResolutionForPatient(form, resolutionText) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userId = userNamesAndId.value.split('id:')[1];
    const response = await getPatientsResolutionsById(userId);
    if (!response) {
      return;
    }
    resolutionText.value = response;
  });
}
