/* eslint-disable import/extensions */
import express from 'express';
import { queqe, map } from '../consts.js';
import forInputPatient from '../handlers/forInputPatient.js';
import checkGetFromDoc from '../handlers/checkGetFromDoc.js';

const router = express.Router();

router.post('/', (req, res) => {
  if (req.body && req.body.name) {
    forInputPatient(queqe, req.body, map);
    res.status(200).send(JSON.stringify('success'));
  } else {
    res.status(400).send(JSON.stringify('incorrect input'));
  }
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
