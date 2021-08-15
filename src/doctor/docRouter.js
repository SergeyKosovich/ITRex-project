import express from 'express';
import Service from './docService.js';
import Controller from './docControllers.js';
import Validator from './docValidators.js';

const service = new Service();
const controller = new Controller();
const validator = new Validator();
const router = express.Router();

router.patch(
  '/',
  validator.checkRes,
  service.setResolution(),
  controller.addToStorage,
);
router.get('/', validator.checkName, controller.sendName());
router.delete(
  '/',
  controller.checkPatIsExist(),
  service.deleteRes(),
  controller.addToStorage,
);

export default router;
