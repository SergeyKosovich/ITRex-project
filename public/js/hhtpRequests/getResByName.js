export default async function getResByName(url, name) {
  try {
    const res = await fetch(`${url}?name=${name}`);
    if (res.status !== 200) {
      throw new Error(res.status);
    }
    const resolutionText = await res.json();
    return resolutionText;
  } catch (err) {
    console.log(err);
    return 'no matches by this name';
  }
}
