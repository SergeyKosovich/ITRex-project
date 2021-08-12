/* eslint-disable import/extensions */
import express from 'express';
import { queqe, map } from '../consts.js';
import forInputPatient from '../handlers/forInputPatient.js';
import checkGetFromDoc from '../handlers/checkGetFromDoc.js';
import ApiError from '../errors/appError.js';

const router = express.Router();

router.post('/', (req, res) => {
  if (!req.body.name) {
    throw new ApiError(400);
  }
  forInputPatient(queqe, req.body, map);
  res.status(200).send(JSON.stringify('success'));
});
router.get(
  '/',
  (req, res, next) => {
    checkGetFromDoc(req, res, next, queqe);
  },
  (req, res) => {
    res.send(JSON.stringify(queqe[0]));
  },
);

export default router;
