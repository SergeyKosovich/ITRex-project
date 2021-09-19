/* eslint-disable import/extensions */
import express from 'express';
import Controller from './patientControllers.js';
import Validator from '../validator/validator.js';

const controller = new Controller();
const validator = new Validator();
const router = express.Router();

router.post('/queue', validator.checkId, controller.addUser);
router.delete('/queue', controller.deleteFirstAndReturnNewFirstFromQueue);
router.get('/queue', controller.getFirstUserInQueue);
router.get('/me', controller.getUser);
router.get('/me/resolutions', controller.getResolutions);

export default router;
