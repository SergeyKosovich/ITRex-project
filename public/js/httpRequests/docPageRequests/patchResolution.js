import { docUrl } from '../../config.js';

export default async function patchResolution(text, currentPatientId, ttl) {
  try {
    let body = { resolution: text, patient_id: currentPatientId };
    if (ttl) {
      body = { resolution: text, patient_id: currentPatientId, ttl };
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
    console.log(err);
    return false;
  }
  return true;
}
