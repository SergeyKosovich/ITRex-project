export default (name) => name
  .split(' ')
  .map((part) => part.slice(0, 1).toUpperCase() + part.slice(1))
  .join(' ');
