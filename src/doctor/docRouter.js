import express from 'express';
import Controller from './docControllers.js';
import Validator from './docValidators.js';

const controller = new Controller();
const validator = new Validator();
const router = express.Router();

router.patch('/', validator.checkRes, controller.patchResolution);
router.get('/', validator.checkName, controller.getByName);
router.delete('/', controller.deleteRes);

export default router;
