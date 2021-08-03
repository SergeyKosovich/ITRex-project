export default function deleteRes(map, input, deleteform, resoltext) {
  deleteform.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!resoltext.value) {
      return;
    }
    if (!map.has(input.value)) {
      resoltext.value = 'no matches by this name';
      return;
    }
    map.delete(input.value);
    resoltext.value = '';
    input.value = '';
  });
}
