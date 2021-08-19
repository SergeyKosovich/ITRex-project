import express from 'express';
import Service from './docService.js';
import Controller from './docControllers.js';
import Validator from './docValidators.js';

const service = new Service();
const controller = new Controller();
const validator = new Validator();
const router = express.Router();

router.patch('/', validator.checkRes, service.setResolution());
router.get('/', validator.checkName, controller.getbyName());
router.delete('/', controller.checkPatientIsExist(), service.deleteRes());

export default router;
