/* eslint-disable import/extensions */
import express from 'express';
import Service from './docService.js';
import Controller from './docControllers.js';

const service = new Service();
const controller = new Controller();
const router = express.Router();

router.patch(
  '/',
  controller.checkRes,
  service.setResolution,
  controller.send200Res,
);
router.get('/', controller.checkName, controller.sendName);
router.delete(
  '/',
  controller.checkPatIsExist,
  service.deleteRes,
  controller.send200Res,
);

export default router;
