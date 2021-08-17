import { data } from '../../main.js';

const { docUrl } = data;

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
      throw new Error(response.status);
    }
    return true;
  } catch (err) {
    console.log(err.name, err.message);
    return false;
  }
}
