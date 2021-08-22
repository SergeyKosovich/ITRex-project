import { userUrl } from '../../config.js';

export default async function deleteFromStack() {
  try {
    const lastPatient = await fetch(userUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (lastPatient.status !== 200) {
      throw new Error(`Something went wrong. Error: ${lastPatient.status}`);
    }
    const response = await lastPatient.json();
    return response;
  } catch (err) {
    console.log(err.message);
    return null;
  }
}
