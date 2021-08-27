import { userUrl } from '../../config.js';

export default async function getQueue() {
  try {
    const response = await fetch(`${userUrl}/queue`);
    if (response.status !== 200) {
      throw new Error(`Something went wrong. Error: ${response.statusText}`);
    }
    const queueArr = await response.json();
    return queueArr;
  } catch (err) {
    console.log(err.message);
    return null;
  }
}
