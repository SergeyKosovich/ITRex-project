import { docUrl } from '../../config.js';

export default async function patchResolution(text, currenPatient) {
  try {
    const response = await fetch(docUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ resolution: text, name: currenPatient }),
    });
    if (response.status !== 200) {
      throw new Error(`Something went wrong. Error: ${response.status}`);
    }
  } catch (err) {
    console.log(err.message);
    return false;
  }
  return true;
}
