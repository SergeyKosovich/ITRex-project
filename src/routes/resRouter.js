/* eslint-disable import/extensions */
import express from 'express';
import { map } from '../consts.js';
import forResolutionHandle from '../handlers/forResolutionHandle.js';
import ApiError from '../errors/appError.js';

const router = express.Router();

router.post('/', (req, res) => {
  forResolutionHandle(req.body, map);
  res.status(200).send('success');
});
router.get('/', (req, res) => {
  if (!req.query.name || req.query.name.length > 30) {
    throw new ApiError(400);
  }
  if (map.has(req.query.name)) {
    res.status(200).send(JSON.stringify(map.get(req.query.name)));
  } else {
    res.status(200).send(JSON.stringify('no matches by this name'));
  }
});
router.delete('/', (req, res) => {
  if (!map.has(req.body.name)) {
    throw new ApiError(400, `No matches by name: ${req.body.name}`);
  }
  map.delete(req.body.name);
  res.status(200).send('success');
});

export default router;
