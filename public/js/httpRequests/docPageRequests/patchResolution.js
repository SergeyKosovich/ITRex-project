import { docUrl } from '../../config.js';

export default async function patchResolution(text, currentPatient, ttl) {
  try {
    let body = { resolution: text, name: currentPatient };
    if (ttl) {
      body = { resolution: text, name: currentPatient, ttl };
    }
    if (currentPatient === 'No patient') {
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
