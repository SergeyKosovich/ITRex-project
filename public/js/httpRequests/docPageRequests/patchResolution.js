import { docUrl } from '../../config.js';

export default async function patchResolution(text, ttl) {
  try {
    const body = ttl ? { resolution: text, ttl } : { resolution: text };
    const jwt = localStorage.getItem('doctor-jwt');
    const response = await fetch(docUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(body),
    });
    if (response.status !== 200) {
      throw new Error(`Something went wrong. Error: ${response.statusText}`);
    }
  } catch (err) {
    console.log(err);
    return false;
  }
  return true;
}
