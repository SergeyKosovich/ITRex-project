import { docUrl } from '../../config.js';

export default async function patchResolution(text, currenPatient, ttl) {
  try {
    let body = { resolution: text, name: currenPatient };
    if (ttl) {
      body = { resolution: text, name: currenPatient, ttl };
    }
    if (currenPatient === 'No patient') {
      body = { resolution: text };
    }
    const response = await fetch(docUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (response.status !== 200) {
      throw new Error(`Something went wrong. Error: ${response.statusText}`);
    }
  } catch (err) {
    console.log(err.message);
    return false;
  }
  return true;
}
