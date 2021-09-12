export default (name) =>
  name
    .trim()
    .toLowerCase()
    .split(" ")
    .map((part) => part.slice(0, 1).toUpperCase() + part.slice(1))
    .join(" ");
