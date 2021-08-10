export default function forResolutionHandle(body, map) {
  if (!body.name && !body.resolution) {
    return;
  }
  if (map.has(body.name)) {
    let previous = map.get(body.name);
    previous += body.resolution;
    map.set(body.name, previous);
    return;
  }
  map.set(body.name, body.resolution);
}
