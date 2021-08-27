import { userUrl } from '../../config.js';

export default async function newUserPost(inner) {
  try {
    const response = await fetch(userUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: inner }),
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
