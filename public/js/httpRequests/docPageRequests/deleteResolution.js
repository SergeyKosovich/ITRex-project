import { docUrl } from '../../config.js';

export default async function deleteResolution(val) {
  try {
    const response = await fetch(docUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: val }),
    });
    if (response.status !== 200) {
      throw new Error(`Something went wrong. Error: ${response.statusText}`);
    }
    return true;
  } catch (err) {
    console.log(err.message);
    return null;
  }
}
