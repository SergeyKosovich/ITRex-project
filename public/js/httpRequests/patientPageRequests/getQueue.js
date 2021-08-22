import { userUrl } from '../../config.js';

export default async function getQueue() {
  const response = await fetch(`${userUrl}/queue`);
  if (response.status !== 200) {
    console.log(response.status);
    return null;
  }
  const queueArr = await response.json();
  return queueArr;
}
