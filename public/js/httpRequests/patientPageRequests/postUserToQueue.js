import { userUrl } from '../../config.js';

export default async function postUserToQueue(name, specialization) {
  try {
    const jwt = localStorage.getItem('jwt');
    const response = await fetch(userUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ name, specialization }),
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
