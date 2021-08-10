export default function checkGetFromDoc(req, res, next, queqe) {
  if (!req.query.lastpatient) {
    return next();
  }
  queqe.shift();
  if (queqe[0]) {
    return res.status(200).send(JSON.stringify(queqe[0]));
  }
  return res.status(200).send(JSON.stringify('No patient'));
}
