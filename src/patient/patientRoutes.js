/* eslint-disable import/extensions */
import express from 'express';
import Controller from './patientControllers.js';

const controller = new Controller();
const router = express.Router();

router.post('/queue', controller.addUser);
router.delete('/queue', controller.deleteFirstAndReturnNewFirstFromQueue);
router.get('/queue', controller.getFirstPatientInQueue);
router.get('/me', controller.getUser);
router.get('/me/resolutions', controller.getResolutions);

export default router;
