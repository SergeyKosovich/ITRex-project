import getResByName from '../hhtpRequests/getResByName.js';
import { data } from '../main.js';

const { docUrl } = data;

export default async function showRes(form, input, resoltext) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const response = await getResByName(docUrl, input.value);
    resoltext.value = response;
  });
}
