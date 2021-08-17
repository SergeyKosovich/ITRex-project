/* eslint-disable import/extensions */
import express from 'express';
import Service from './patientService.js';
import Controller from './patientControllers.js';
import Validator from './patientValidators.js';

const service = new Service();
const controller = new Controller();
const validator = new Validator();
const router = express.Router();

router.post('/', validator.checkName, controller.addUser());
router.delete('/', service.removeTopPacient(), controller.checkQueqe());
router.get('/', controller.getName());
router.get('/queue', controller.getQueue());

export default router;
