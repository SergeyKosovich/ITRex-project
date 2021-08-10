/* eslint-disable import/extensions */
import express from 'express';
import { map } from '../consts.js';
import forResolutionHandle from '../handlers/forResolutionHandle.js';

const router = express.Router();

router.post('/', (req, res) => {
  forResolutionHandle(req.body, map);
  res.status(200).send('success');
});
router.get('/', (req, res) => {
  if (map.has(req.query.name)) {
    res.status(200).send(JSON.stringify(map.get(req.query.name)));
  } else {
    res.status(200).send(JSON.stringify('no matches by this name'));
  }
});
router.delete('/', (req, res) => {
  map.delete(req.body.name);
  res.status(200).send(JSON.stringify('no matches by this name'));
});

export default router;
