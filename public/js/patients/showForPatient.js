import { data } from '../main.js';
import getResByName from '../hhtpRequests/getResByName.js';

const { docUrl } = data;
export default function showForPatient(form, input, resoltext) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const response = await getResByName(docUrl, input.value);
    resoltext.value = response;
  });
  form.addEventListener('focusout', (e) => {
    e.preventDefault();
    resoltext.value = '';
    input.value = '';
  });
}
