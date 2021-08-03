export default function deleteRes(map, input, deleteform, resoltext) {
  deleteform.addEventListener('submit', (e) => {
    e.preventDefault();
    if (map.has(input.value) && resoltext.value) {
      map.delete(input.value);
      resoltext.value = '';
      input.value = '';
      return;
    }
    resoltext.value = 'no matches by this name';    
  });
}
