export default function forInputPatient(queqe, body, map) {
  queqe.push(body.name);
  if (body.ttl) {
    setTimeout(() => {
      map.delete(body.name);
      const index = queqe.indexOf(body.name);
      queqe.splice(index, 1);
    }, body.ttl * 1000 + 1000);
  }
}
