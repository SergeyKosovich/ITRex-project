/* eslint-disable import/extensions */
import express from 'express';
import Service from './pacService.js';
import Controller from './pacControllers.js';

const service = new Service();
const controller = new Controller();
const router = express.Router();

router.post(
  '/',
  controller.checkName,
  service.addToQue(),
  service.wsMessage,
  service.removeAfterTtl(),
  controller.addToStorage,
);
router.delete('/', service.removeTopPacient, controller.checkQueqe());
router.get('/', controller.getName());

export default router;
