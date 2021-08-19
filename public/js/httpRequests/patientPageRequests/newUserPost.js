import { userUrl } from '../../config.js';

export default async function newUserPost(inner, value) {
  try {
    const response = await fetch(userUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: inner, ttl: value }),
    });
    if (response.status !== 200) {
      throw new Error(`Something went wrong. Error: ${response.status}`);
    }
    return true;
  } catch (err) {
    console.log(err.message);
    return null;
  }
}