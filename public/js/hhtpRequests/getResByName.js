export default function getResByName(docUrl, name) {
  return fetch(`${docUrl}?name=${name}`);
}
