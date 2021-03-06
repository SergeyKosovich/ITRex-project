import { userUrl } from '../../config.js';

export default async function deleteFromStack(jwt) {
  try {
    const lastPatient = await fetch(userUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    });
    if (lastPatient.status !== 200) {
      throw new Error(`Something went wrong. Error: ${lastPatient.statusText}`);
    }
    const response = await lastPatient.json();
    return response;
  } catch (err) {
    console.log(err.message);
    return null;
  }
}
