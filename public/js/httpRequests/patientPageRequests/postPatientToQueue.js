import { userUrl } from '../../config.js';

export default async function postPatientToQueue() {
  try {
    const jwt = localStorage.getItem('jwt');
    const response = await fetch(userUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    });
    if (response.status !== 200) {
      throw new Error(`Something went wrong. Error: ${response.statusText}`);
    }
    return 1;
  } catch (err) {
    console.log(err.message);
    return null;
  }
}
