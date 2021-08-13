/* eslint-disable import/extensions */
import express from 'express';
import Controller from './pacControllers.js';
import Service from './pacService.js';

const service = new Service();
const controller = new Controller();
const router = express.Router();

router.post('/', controller.checkBody, service.addToQue, controller.forTtl);
router.delete('/', service.removeTopPac, controller.checkQueqe);
router.get('/', controller.sendName);

export default router;
