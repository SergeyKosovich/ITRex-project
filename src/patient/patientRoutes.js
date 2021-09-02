/* eslint-disable import/extensions */
import express from 'express';
import Controller from './patientControllers.js';
import Validator from './patientValidators.js';

const controller = new Controller();
const validator = new Validator();
const router = express.Router();

router.post('/', validator.checkName, controller.addUser);
router.delete('/', controller.deleteFirstAndReturnNewFirstFromQueue);
router.get('/', controller.getName);
router.get('/queue', controller.getQueue);

export default router;
