import { userUrl } from '../../config.js';

export default async function userDataPost(email, password) {
  try {
    const response = await fetch(`${userUrl}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (response.status !== 200) {
      throw new Error(`Something went wrong. Error: ${response.statusText}`);
    }
    return response.json();
  } catch (err) {
    console.log(err.message);
    return null;
  }
}
