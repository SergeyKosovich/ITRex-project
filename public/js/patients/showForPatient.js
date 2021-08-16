import { data } from '../main.js';
import getResByName from '../hhtpRequests/getResByName.js';

const { docUrl } = data;
export default function showForPatient(form, input, resoltext) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      const res = await getResByName(docUrl, input.value);
      if (res.status !== 200) {
        resoltext.value = 'no matches by this name';
        throw new Error(res.status);
      }
      const response = await res.json();
      resoltext.value = response;
    } catch (err) {
      console.log(err.name);
    }
  });
  form.addEventListener('focusout', (e) => {
    e.preventDefault();
    resoltext.value = '';
    input.value = '';
  });
}
