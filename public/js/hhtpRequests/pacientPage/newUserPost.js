import { data } from '../../main.js';

const { userUrl } = data;

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
      throw new Error(response.status);
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
